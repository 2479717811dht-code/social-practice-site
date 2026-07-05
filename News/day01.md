<script setup>
// 💡 强行命令打包机：去当前目录下的 pdfs 文件夹把 test.pdf 抓过来一起打包上线！
import pdfUrl from './pdfs/test.pdf'
</script>

# 调研报告与支撑材料

以下是浙大竺院赴南宁实践团的成果报告，您可以直接在线翻阅：

<!-- 💡 绑定变量 pdfUrl，打包机会自动帮它生成带哈希值的绝对路径 -->
<iframe 
  :src="pdfUrl" 
  width="100%" 
  height="800px" 
  style="border: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);"
>
</iframe>

---

### 📥 下载文件

<a :href="pdfUrl" target="_blank" style="color: var(--vp-c-brand-1); font-weight: bold; text-decoration: underline;">
  ⬇️ 点击下载实践报告 PDF 文件
</a>