
const axios = require('axios/dist/node/axios.cjs')
//import axios from 'axios'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import FormData from 'form-data'

export default async function handler(req, res) {
  
  //res.send({response:'Success'})
  const swpTemplateURL = req.body.swpTemplateUrl
  //console.log(swpTemplateURL)

  res.send({url: swpTemplateURL})
  // const response = await axios.get(swpTemplateURL, { responseType: 'arraybuffer' })
  // res.send (response.data)


  // const buffer = Buffer.from(response.data);
  // const zip = new PizZip(buffer)
  // const doc = new Docxtemplater(zip, {
  //   paragraphLoop: true,
  //   linebreaks: true,
  // });
  // doc.render({
  //   Name: req.body.name,
  //   Definition: req.body.definition,
  //   CalloutText: req.body.calloutText,
  //   Notes: req.body.notes,
  //   Phases: req.body.phases,
  //   Version: req.body.version,
  //   Published: req.body.published
  // })
  // const buf = doc.getZip().generate({
  //   type: "nodebuffer",
  //   // compression: DEFLATE adds a compression step.
  //   // For a 50MB output document, expect 500ms additional CPU time
  //   compression: "DEFLATE",
  // });

  // // Create a new FormData object
  // const formData = new FormData()

  // // Append the buffer as a file with a custom filename
  // formData.append('file', buf, `SWP - ${req.body.name}.docx`)
  

  // // Add the form data fields
  // //formData.append('expires', '2023-03-15T08:01:16.767Z')
  // formData.append('maxDownloads', '1')
  // formData.append('autoDelete', 'true')

  // // Make a POST request to the file.io API endpoint with the FormData as the payload
  // await axios.post('https://file.io/', formData, {
  //   headers: {
  //     'accept': 'application/json',
  //     'Authorization': 'Bearer PW2UY6R.JJDNG1C-NTGMHNH-NR2XKQB-MB2JXTG',
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }).then(response => {
  //   console.log(response)

  //   // Set response headers to specify the content type and attachment
  //   //res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  //   //res.setHeader('Content-Disposition', 'attachment; filename="example.docx"')
  
  //   // Send the buffer as the response
  //   res.send(response.data.link)
  // })
}