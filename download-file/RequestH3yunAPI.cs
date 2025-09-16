using System.Text;
using System.Text.Json.Nodes;
using System.Text.Json;
using System.Net;

namespace Util
{
    /// <summary>
    /// 氚云OpenApi调用辅助类
    /// </summary>
    public class RequestH3yunAPI
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly TimeSpan _timeout;
        public readonly string _engineCode;
        public readonly string _engineSecret;

        /// <summary>
        /// 氚云OpenApi调用辅助类 构造方法
        /// </summary>
        /// <param name="httpClientFactory"></param>
        /// <param name="engineCode"></param>
        /// <param name="engineSecret"></param>
        /// <param name="timeoutSeconds">请求超时时间，单位：秒</param>
        /// <exception cref="Exception">参数不符合要求时，抛出异常</exception>
        public RequestH3yunAPI(IHttpClientFactory httpClientFactory, string engineCode, string engineSecret, int timeoutSeconds = 300)
        {
            _httpClientFactory = httpClientFactory ?? throw new Exception($"参数{nameof(httpClientFactory)}不能为空！");
            _timeout = TimeSpan.FromSeconds(timeoutSeconds);

            if (string.IsNullOrWhiteSpace(engineCode))
            {
                throw new Exception($"参数{nameof(engineCode)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(engineSecret))
            {
                throw new Exception($"参数{nameof(engineSecret)}不能为空！");
            }

            _engineCode = engineCode;
            _engineSecret = engineSecret;
        }

        /// <summary>
        /// 加载单条表单数据
        /// </summary>
        /// <param name="schemaCode">表单编码</param>
        /// <param name="bizObjectId">数据Id</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Dictionary<string, object> LoadBizObject(string schemaCode, string bizObjectId)
        {
            if (string.IsNullOrWhiteSpace(schemaCode))
            {
                throw new Exception($"参数{nameof(schemaCode)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(bizObjectId))
            {
                throw new Exception($"参数{nameof(bizObjectId)}不能为空！");
            }
            Dictionary<string, object> reqParam = new()
            {
                { "ActionName", "LoadBizObject" },
                { "SchemaCode", schemaCode },
                { "BizObjectId", bizObjectId }
            };
            return Invoke(reqParam);
        }

        /// <summary>
        /// 查询多条表单数据
        /// </summary>
        /// <param name="schemaCode">表单编码</param>
        /// <param name="filter">筛选器json</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Dictionary<string, object> LoadBizObjects(string schemaCode, string filter)
        {
            if (string.IsNullOrWhiteSpace(schemaCode))
            {
                throw new Exception($"参数{nameof(schemaCode)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(filter))
            {
                throw new Exception($"参数{nameof(filter)}不能为空！");
            }
            Dictionary<string, object> reqParam = new()
            {
                { "ActionName", "LoadBizObjects" },
                { "SchemaCode", schemaCode },
                { "Filter", filter }
            };
            return Invoke(reqParam);
        }

        /// <summary>
        /// 修改表单数据
        /// </summary>
        /// <param name="schemaCode">表单编码</param>
        /// <param name="bizObjectId">数据Id</param>
        /// <param name="bizObject">要更新的字段，组合成的json</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Dictionary<string, object> UpdateBizObject(string schemaCode, string bizObjectId, string bizObject)
        {
            if (string.IsNullOrWhiteSpace(schemaCode))
            {
                throw new Exception($"参数{nameof(schemaCode)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(bizObjectId))
            {
                throw new Exception($"参数{nameof(bizObjectId)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(bizObject))
            {
                throw new Exception($"参数{nameof(bizObject)}不能为空！");
            }
            Dictionary<string, object> reqParam = new()
            {
                { "ActionName", "UpdateBizObject" },
                { "SchemaCode", schemaCode },
                { "BizObjectId", bizObjectId },
                { "BizObject", bizObject }
            };
            return Invoke(reqParam);
        }

        /// <summary>
        /// 调用氚云端编写的自定义接口
        /// </summary>
        /// <param name="actionName">对应自定义接口OnInvoke的传入参数actionName</param>
        /// <param name="controller">自定义接口控制器类名</param>
        /// <param name="appCode">自定义接口所在应用的应用编码</param>
        /// <param name="otherParam">传给自定义接口的一些其他参数</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Dictionary<string, object> MyApi(string actionName, string controller, string appCode, Dictionary<string, object> otherParam)
        {
            if (string.IsNullOrWhiteSpace(actionName))
            {
                throw new Exception($"参数{nameof(actionName)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(controller))
            {
                throw new Exception($"参数{nameof(controller)}不能为空！");
            }
            if (string.IsNullOrWhiteSpace(appCode))
            {
                throw new Exception($"参数{nameof(appCode)}不能为空！");
            }
            Dictionary<string, object> reqParam = new()
            {
                { "ActionName", actionName },
                { "Controller", controller },
                { "AppCode", appCode }
            };
            if (otherParam != null && otherParam.Count > 0)
            {
                foreach (KeyValuePair<string, object> op in otherParam)
                {
                    reqParam.Add(op.Key, op.Value);
                }
            }
            return this.Invoke(reqParam);
        }

        /// <summary>
        /// 获取一个HttpClient，并初始化一些设置
        /// </summary>
        /// <returns></returns>
        private HttpClient GetHttpClient()
        {
            HttpClient client = _httpClientFactory.CreateClient();
            client.Timeout = _timeout;
            client.DefaultRequestHeaders.ConnectionClose = true;
            return client;
        }

        /// <summary>
        /// 请求氚云OpenApi
        /// </summary>
        /// <param name="reqParam"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private Dictionary<string, object> Invoke(Dictionary<string, object> reqParam)
        {
            //参数
            if (reqParam == null || reqParam.Count == 0)
            {
                throw new Exception("请求参数不能为空！");
            }

            string apiAddress = @"https://www.h3yun.com/OpenApi/Invoke";
            HttpClient client = GetHttpClient();

            using HttpRequestMessage req = new(HttpMethod.Post, apiAddress);
            req.Headers.Add("EngineCode", _engineCode);
            req.Headers.Add("EngineSecret", _engineSecret);

            string jsonData = JsonSerializer.Serialize(reqParam);
            using StringContent content = new(jsonData, Encoding.UTF8, "application/json");
            req.Content = content;
            using HttpResponseMessage res = client.SendAsync(req).Result;
            using Stream s = res.Content.ReadAsStream();
            using StreamReader sr = new(s);
            string strValue = sr.ReadToEnd();
            if (!res.IsSuccessStatusCode)
            {
                throw new Exception("请求氚云Api失败：" + strValue);
            }

            return ProcessGeneralResponseContent(strValue);
        }

        /// <summary>
        /// 解析氚云OpenApi的响应内容
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private static Dictionary<string, object> ProcessGeneralResponseContent(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                throw new Exception("氚云OpenApi无响应数据！");
            }

            JsonNode? obj;
            try
            {
                obj = JsonNode.Parse(content);
            }
            catch (Exception)
            {
                throw new Exception("氚云OpenApi响应数据格式错误！");
            }
            if (obj == null)
            {
                throw new Exception("氚云OpenApi响应数据无内容！");
            }
            bool? Successful = obj["Successful"]?.GetValue<bool>();
            if (Successful != null && Successful.Value)
            {
                string ReturnData = obj["ReturnData"] + string.Empty;
                if (string.IsNullOrWhiteSpace(ReturnData))
                {
                    return new Dictionary<string, object>();
                }
                Dictionary<string, object>? data = JsonSerializer.Deserialize<Dictionary<string, object>>(ReturnData);
                if (data == null)
                {
                    return new Dictionary<string, object>();
                }
                return data;
            }
            else
            {
                string ErrorMessage = obj["ErrorMessage"] + string.Empty;
                if (string.IsNullOrEmpty(ErrorMessage))
                {
                    throw new Exception("请求氚云OpenApi响应未知异常！");
                }
                throw new Exception(ErrorMessage);
            }
        }

        /// <summary>
        /// 上传附件至氚云的图片/附件控件
        /// </summary>
        /// <param name="schemaCode">表单编码</param>
        /// <param name="filePropertyName">控件编码</param>
        /// <param name="bizObjectId">数据Id</param>
        /// <param name="fileName">文件名</param>
        /// <param name="mimeType">文件MIME</param>
        /// <param name="fileStream">文件流</param>
        /// <returns>上传完成后，该附件在氚云上的附件Id</returns>
        /// <exception cref="Exception"></exception>
        public string UploadAttachment(string schemaCode, string filePropertyName, string bizObjectId, string fileName, string mimeType, Stream fileStream)
        {
            if (string.IsNullOrWhiteSpace(schemaCode))
            {
                throw new Exception("参数" + nameof(schemaCode) + "不能为空！");
            }
            if (string.IsNullOrWhiteSpace(filePropertyName))
            {
                throw new Exception("参数" + nameof(filePropertyName) + "不能为空！");
            }
            if (string.IsNullOrWhiteSpace(bizObjectId))
            {
                throw new Exception("参数" + nameof(bizObjectId) + "不能为空！");
            }
            if (string.IsNullOrWhiteSpace(fileName))
            {
                throw new Exception("参数" + nameof(fileName) + "不能为空！");
            }
            if (fileStream == null || fileStream.Length == 0)
            {
                throw new Exception("参数" + nameof(fileStream) + "不能为空！");
            }
            if (fileStream.Length > 3 * 1024 * 1024)//文件大于3M，无法上传到氚云
            {
                throw new Exception(nameof(this.UploadAttachment) + "接口要求文件不能大于3MB！");
            }

            string url = string.Format("https://www.h3yun.com/OpenApi/UploadAttachment?SchemaCode={0}&FilePropertyName={1}&BizObjectId={2}", schemaCode, filePropertyName, bizObjectId);
            Uri requestUri = new(url);

            string strBoundary = "----------" + DateTime.Now.Ticks.ToString("x");
            byte[] boundaryBytes = Encoding.ASCII.GetBytes("\r\n--" + strBoundary + "--\r\n");
            StringBuilder stringBuilder = new();
            stringBuilder.Append("--");
            stringBuilder.Append(strBoundary);
            stringBuilder.Append("\r\n");
            stringBuilder.Append("Content-Disposition: form-data; name=\"media\";");
            stringBuilder.Append(" filename=\"");
            stringBuilder.Append(fileName);
            stringBuilder.Append("\"\r\n");
            stringBuilder.Append("Content-Type: ");
            stringBuilder.Append(mimeType);
            stringBuilder.Append("\r\n\r\n");
            string strPostHeader = stringBuilder.ToString();
            byte[] postHeaderBytes = Encoding.UTF8.GetBytes(strPostHeader);

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(requestUri);
            req.Timeout = Convert.ToInt32(_timeout.TotalMilliseconds);
            req.Headers.Set(HttpRequestHeader.Connection, "close");
            req.ContentType = "multipart/form-data; boundary=" + strBoundary;
            req.Method = "POST";
            req.Headers.Add("EngineCode", _engineCode);
            req.Headers.Add("EngineSecret", _engineSecret);
            req.AllowWriteStreamBuffering = false;
            using Stream s = req.GetRequestStream();
            s.Write(postHeaderBytes, 0, postHeaderBytes.Length);

            byte[] buff = new byte[1 * 1024 * 1024];//1MB每次
            while (fileStream.Read(buff, 0, buff.Length) > 0)
            {
                s.Write(buff, 0, buff.Length);
            }
            //重置回流开头
            fileStream.Seek(0, SeekOrigin.Begin);

            s.Write(boundaryBytes, 0, boundaryBytes.Length);

            using WebResponse res = req.GetResponse();
            using Stream rs = res.GetResponseStream();
            using StreamReader sr = new(rs);
            string resContent = sr.ReadToEnd();

            Dictionary<string, object> resData = ProcessGeneralResponseContent(resContent);
            if (resData != null && resData.ContainsKey("AttachmentId"))
            {
                return resData["AttachmentId"] + string.Empty;
            }
            throw new Exception("氚云OpenApi未响应AttachmentId！");
        }

        /// <summary>
        /// 下载氚云的图片/附件
        /// </summary>
        /// <param name="fileId">氚云上的附件Id</param>
        /// <param name="fileName">out 该附件的文件名</param>
        /// <returns>文件流</returns>
        /// <exception cref="Exception"></exception>
        public Stream DownloadBizObjectFile(string fileId, out string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileId))
            {
                throw new Exception("参数" + nameof(fileId) + "不能为空！");
            }

            HttpClient client = GetHttpClient();

            //身份认证参数
            FormUrlEncodedContent content = new(
                new Dictionary<string, string>
                {
                    { "attachmentId", fileId },
                    { "EngineCode", _engineCode }
                }
            );
            content.Headers.Add("EngineCode", _engineCode);
            content.Headers.Add("EngineSecret", _engineSecret);

            using HttpResponseMessage result = client.PostAsync("https://www.h3yun.com/Api/DownloadBizObjectFile", content).Result;
            if (result.IsSuccessStatusCode)
            {
                if (result.Content.Headers.ContentDisposition == null || string.IsNullOrWhiteSpace(result.Content.Headers.ContentDisposition.FileName))
                {
                    fileName = fileId;
                }
                else
                {
                    fileName = result.Content.Headers.ContentDisposition.FileName;
                    fileName = System.Web.HttpUtility.UrlDecode(fileName);
                }

                Stream resStream = result.Content.ReadAsStreamAsync().Result;
                return resStream;
            }
            else
            {
                throw new Exception("通过氚云OpenApi下载附件失败！");
            }
        }
    }
}