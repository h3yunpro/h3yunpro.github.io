/**
 * 表单结构解析器
 * 用于从氚云表单结构 JSON 中提取字段信息
 */

export interface ExtractedField {
  key: string
  displayName: string
  isChild: boolean
}

export interface SchemaInfo {
  schemaName: string
  schemaCode: string
  controlsData: any
}

/**
 * 递归提取控件字段
 */
export function recursiveExtract(
  data: any,
  resultList: ExtractedField[],
  prefix: string = '',
  currentSchemaName: string = ''
): void {
  if (Array.isArray(data)) {
    data.forEach(item => {
      recursiveExtract(item, resultList, prefix, currentSchemaName)
    })
  } else if (typeof data === 'object' && data !== null) {
    const key = data.Key
    const options = data.Options || {}
    const displayName = options.DisplayName
    const controlKey = options.ControlKey
    const childControls = data.ChildControls

    if (controlKey === 'FormGridView' && displayName) {
      const newPrefix = `${displayName}.`
      resultList.push({
        key: '- ' + key,
        displayName: `子表 [${displayName}] 字段列表：`,
        isChild: false
      })
      resultList.push({
        key: 'ObjectId',
        displayName: '子表 [' + displayName + '] 数据 Id, 唯一标识',
        isChild: true
      })
      resultList.push({
        key: 'ParentObjectId',
        displayName: '主表 [' + currentSchemaName + '] 数据 Id, 跟主表 ObjectId 关联',
        isChild: true
      })

      if (childControls) {
        recursiveExtract(childControls, resultList, newPrefix, currentSchemaName)
      }
    } else {
      if (key && displayName) {
        const fullDisplayName = prefix ? prefix + displayName : displayName
        const isChild = !!prefix
        let cleanKey = key

        if (isChild && key.includes('.')) {
          const index = key.indexOf('.')
          cleanKey = key.substring(index + 1)
        }

        resultList.push({ key: cleanKey, displayName: fullDisplayName, isChild })
      }

      if (childControls) {
        recursiveExtract(childControls, resultList, prefix, currentSchemaName)
      }
    }
  }
}

/**
 * 从 JSON 中提取表单信息
 */
export function extractSchemaInfo(jsonData: any): SchemaInfo {
  let schemaName = ''
  let schemaCode = ''
  let designModeContent: any = null

  // 尝试从 ReturnData 中获取表单信息
  if (jsonData.ReturnData) {
    schemaName = jsonData.ReturnData.SheetName || ''
    schemaCode = jsonData.ReturnData.SheetCode || ''
    designModeContent = jsonData.ReturnData.DesignModeContent
  } else {
    // 如果没有 ReturnData，尝试直接从根对象获取
    schemaName = jsonData.SheetName || ''
    schemaCode = jsonData.SheetCode || ''
    designModeContent = jsonData.DesignModeContent
  }

  // 验证必要字段
  if (!schemaName) {
    throw new Error('JSON 中未找到表单名称（SheetName）')
  }

  if (!schemaCode) {
    throw new Error('JSON 中未找到表单编码（SheetCode）')
  }

  // 解析 DesignModeContent
  let controlsData: any
  try {
    if (typeof designModeContent === 'string') {
      controlsData = JSON.parse(designModeContent)
    } else {
      controlsData = designModeContent
    }
  } catch (e) {
    throw new Error(
      `DesignModeContent 解析失败：${e instanceof Error ? e.message : '未知错误'}`
    )
  }

  if (!controlsData) {
    throw new Error('JSON 中未找到 DesignModeContent 字段')
  }

  return {
    schemaName,
    schemaCode,
    controlsData
  }
}

/**
 * 解析 JSON 并生成字段表文本
 */
export function parseSchemaJSON(jsonInput: string): string {
  // 解析 JSON
  let jsonData: any
  try {
    jsonData = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput
  } catch (e) {
    throw new Error(`JSON 解析失败：${e instanceof Error ? e.message : '未知错误'}`)
  }

  // 提取表单信息
  const { schemaName, schemaCode, controlsData } = extractSchemaInfo(jsonData)

  // 提取字段
  const extractedData: ExtractedField[] = []
  extractedData.push({ key: 'ObjectId', displayName: '数据 Id, 唯一标识', isChild: false })
  recursiveExtract(controlsData, extractedData, '', schemaName)

  if (extractedData.length === 0) {
    throw new Error('未找到任何 Key 和 DisplayName 字段')
  }

  // 生成结果文本
  let output = `- 表单名称：${schemaName}\n`
  output += `- 表单编码：${schemaCode}\n`
  output += `- 数据库表名：i_${schemaCode}\n\n`
  output += `- ${schemaName} 字段列表：\n`

  extractedData.forEach(item => {
    // 跳过无效的列表项标记
    if (item.key.includes('-') && !item.key.startsWith('- ')) {
      return
    }

    const indent = item.isChild ? '     ' : ''
    const line = `   ${indent}${item.key} ${item.displayName}`
    output += line + '\n'
  })

  return output
}

/**
 * 从结果文本中提取表单名称
 */
export function extractSchemaNameFromResult(result: string): string {
  const nameMatch = result.match(/- 表单名称：(.+)/)
  return nameMatch ? nameMatch[1].trim() : '表单'
}
