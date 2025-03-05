"use strict";(self.webpackChunkh3yun_pdocs=self.webpackChunkh3yun_pdocs||[]).push([[350],{3613:(s,i,a)=>{a.r(i),a.d(i,{comp:()=>l,data:()=>h});var t=a(641);const n={},l=(0,a(6262).A)(n,[["render",function(s,i){return(0,t.uX)(),(0,t.CE)("div",null,i[0]||(i[0]=[(0,t.Fv)('<h2 id="smartform-responsecontext" tabindex="-1"><a class="header-anchor" href="#smartform-responsecontext"><span>$.SmartForm.ResponseContext</span></a></h2><p><code>$.SmartForm.ResponseContext</code> 仅在表单前端代码中可用，可以通过此实例属性获取表单的当前状态。</p><h3 id="属性" tabindex="-1"><a class="header-anchor" href="#属性"><span>属性</span></a></h3><table><thead><tr><th><strong>属性名</strong></th><th><strong>数据类型</strong></th><th><strong>说明</strong></th><th><strong>示例</strong></th></tr></thead><tbody><tr><td>ActivityCode</td><td>string</td><td>流程节点编码</td><td></td></tr><tr><td>DisplayName</td><td>string</td><td>表单名称</td><td></td></tr><tr><td>FormDataType</td><td>number</td><td>表单数据类型</td><td></td></tr><tr><td>FormMode</td><td>number</td><td>表单模式，0为审批/办理 ，1为办理完结 ，2为创建 ，4为查阅</td><td></td></tr><tr><td>InstanceId</td><td>string</td><td>当前表单数据的流程实例</td><td></td></tr><tr><td>IsCreateMode</td><td>boolean</td><td>是否创建模式，true：创建模式</td><td></td></tr><tr><td>BizObjectId</td><td>string</td><td>当前对象ID</td><td></td></tr><tr><td>BizObjectStatus</td><td>number</td><td>当前对象状态，取值及释义：0 草稿；1 生效/流程结束；2 流程进行中；3 作废</td><td></td></tr><tr><td>SchemaCode</td><td>string</td><td>当前表单的SchemaCode</td><td></td></tr><tr><td>IsMobile</td><td>boolean</td><td>是否移动端，true：移动端</td><td></td></tr><tr><td>Originator</td><td>string</td><td>发起人用户ID</td><td></td></tr><tr><td>OriginatorCode</td><td>string</td><td>发起人用户名</td><td></td></tr><tr><td>OriginatorParentId</td><td>string</td><td>发起人所在部门ID</td><td></td></tr></tbody></table><h2 id="this" tabindex="-1"><a class="header-anchor" href="#this"><span>this</span></a></h2><p><code>this</code> 仅在表单前端代码的事件中可用，它是表单实例，表单上的控件是它的属性，所以用 <code>that.控件编码</code> 就能拿到控件。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>建议事件内第一句代码，用一个变量转存 <code>this</code>，以防指向错误的BUG。</p></div><p>正确/错误做法示例：</p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes one-light one-dark-pro has-diff has-highlighted vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 加载事件</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">OnLoad</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //这里先用that接收this，后面用that替换this，就可以避免this指向错误的问题</span></span>\n<span class="line diff add"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;" class="highlighted-word">that</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">    </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;" class="highlighted-word">that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">F0000001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">BindChange</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">$</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">IGuid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(), </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //正确做法：上面用</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;" class="highlighted-word">that</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">接收this，这里用</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;" class="highlighted-word">that</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">替换this，就可以避免this指向错误的问题</span></span>\n<span class="line diff add"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> val</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;" class="highlighted-word">that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">F0000001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(); </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //错误做法，会导致this指向错误，从而提示GetValue/SetValue等函数不存在</span></span>\n<span class="line diff remove highlighted error"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> val</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">F0000001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(); </span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    });</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">},</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控件实例获取" tabindex="-1"><a class="header-anchor" href="#控件实例获取"><span>控件实例获取</span></a></h2><p>氚云的表单前端只允许用户 取值/赋值/显示/隐藏/只读/可写 控件数据，不允许设置控件的样式。</p><p>而想要做到以上的操作，就需要通过控件实例，下面是获取控件实例的一些示例：</p><h3 id="主表控件实例获取" tabindex="-1"><a class="header-anchor" href="#主表控件实例获取"><span>主表控件实例获取：</span></a></h3><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//that 即事件内的 this 转存</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//F0000001 是主表控件编码</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> con</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">F0000001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子表控件实例获取方式" tabindex="-1"><a class="header-anchor" href="#子表控件实例获取方式"><span>子表控件实例获取方式：</span></a></h3><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//that 即事件内的 this 转存</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//D000726F0001 是子表控件编码</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> ctCon</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">D000726F0001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子表内控件实例获取方式" tabindex="-1"><a class="header-anchor" href="#子表内控件实例获取方式"><span>子表内控件实例获取方式：</span></a></h3><div class="language-js line-numbers-mode has-collapsed collapsed" data-ext="js" data-title="js" style="--vp-collapsed-lines:15;"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//that 即事件内的 this 转存</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//D000726F0001 是子表控件编码</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//D000726F0001.F0000002 是子表内控件的编码</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//获取子表所有行的数据集合</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> rows</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">D000726F0001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//判断子表数据集合是否有值</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">rows</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> &amp;&amp;</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ) {</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //获取子表第一行数据的ObjectId</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> firstRowId</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ].</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">ObjectId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //获取子表第一行数据 D000726F0001.F0000002 控件的实例</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> cellCon</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">D000726F0001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetCellManager</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">firstRowId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;D000726F0001.F0000002&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> );</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //循环子表每行的数据</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> &lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ) {</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> currRowData</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[ </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ];</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //获取子表当前行的ObjectId</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> currRowId</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> currRowData</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">ObjectId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //获取子表当前行的数据 D000726F0001.F0000002 控件的实例</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> currCellCon</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> that</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">D000726F0001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetCellManager</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">currRowId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;D000726F0001.F0000002&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> );</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="collapsed-lines"></div></div>',18)]))}]]),h=JSON.parse('{"path":"/docs/js-instance/","title":"前端常用实例","lang":"zh-CN","frontmatter":{"title":"前端常用实例","createTime":"2025/02/17 19:06:40","permalink":"/docs/js-instance/","description":"$.SmartForm.ResponseContext $.SmartForm.ResponseContext 仅在表单前端代码中可用，可以通过此实例属性获取表单的当前状态。 属性 this this 仅在表单前端代码的事件中可用，它是表单实例，表单上的控件是它的属性，所以用 that.控件编码 就能拿到控件。 提示 建议事件内第一句代码，用一个变量转...","head":[["meta",{"property":"og:url","content":"https://h3yunpro.github.io/docs/js-instance/"}],["meta",{"property":"og:site_name","content":"氚专开发者扩展文档"}],["meta",{"property":"og:title","content":"前端常用实例"}],["meta",{"property":"og:description","content":"$.SmartForm.ResponseContext $.SmartForm.ResponseContext 仅在表单前端代码中可用，可以通过此实例属性获取表单的当前状态。 属性 this this 仅在表单前端代码的事件中可用，它是表单实例，表单上的控件是它的属性，所以用 that.控件编码 就能拿到控件。 提示 建议事件内第一句代码，用一个变量转..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T09:58:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-28T09:58:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端常用实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-28T09:58:40.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.42,"words":725},"git":{"updatedTime":1740736720000,"contributors":[{"name":"氚云-凡狐","username":"氚云-凡狐","email":"huca@authine.com","commits":3,"avatar":"https://avatars.githubusercontent.com/氚云-凡狐?v=4","url":"https://github.com/氚云-凡狐"}]},"autoDesc":true,"filePathRelative":"notes/docs/前端API/前端常用实例.md"}')}}]);