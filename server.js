const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('mergedpdf'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})
 
app.post('https://amank2001.github.io/merge', upload.array('pdfs', 3), async (req, res, next)=> {
  console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), path.join(__dirname, req.files[2].path))
  res.redirect(`static/${d}.pdf` )
})

app.listen(port, () => {
  console.log(`Your app is listening on port http://localhost:${port}`)
})