
const axios = require('axios/dist/node/axios.cjs')
//import axios from 'axios'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import FormData from 'form-data'

import docxToPdfAxios from 'docx-to-pdf-axios'

export default async function handler(req, res) {
  
  const swpTemplateURL = req.body.swpTemplateUrl

  const response = await axios.get(swpTemplateURL, { responseType: 'arraybuffer' })

  const buffer = Buffer.from(response.data);
  const zip = new PizZip(buffer)
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render({
    Name: req.body.name,
    Definition: req.body.definition,
    CalloutText: req.body.calloutText,
    Notes: req.body.notes,
    Phases: req.body.phases,
    Version: req.body.version,
    Published: req.body.published
  })
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  docxToPdfAxios(buf)
  .then((pdfArrayBuffer) => {
    console.log(pdfArrayBuffer)
    // Create a new FormData object
    const formData = new FormData()

    // Append the buffer as a file with a custom filename
    formData.append('file', pdfArrayBuffer, `SWP - ${req.body.name}.pdf`)
    
    // Add the form data fields
    //formData.append('expires', '2023-03-15T08:01:16.767Z')
    //formData.append('maxDownloads', '1')
    //formData.append('autoDelete', 'true')


    // Method: POST

    // Params: file=/path/to/test.jpg

    // URL: https://tmpfiles.org/api/v1/upload
    // Make a POST request to the file.io API endpoint with the FormData as the payload
    axios.post('https://tmpfiles.org/api/v1/upload', formData, {
      headers: {
        'accept': 'application/json',
        //'Authorization': 'Bearer PW2UY6R.JJDNG1C-NTGMHNH-NR2XKQB-MB2JXTG',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
      let url = response.data.data.url
      url = url.replace(".org/", ".org/dl/")
      res.send({link: url})
    })


    // // Make a POST request to the file.io API endpoint with the FormData as the payload
    // axios.post('https://file.io/', formData, {
    //   headers: {
    //     'accept': 'application/json',
    //     'Authorization': 'Bearer PW2UY6R.JJDNG1C-NTGMHNH-NR2XKQB-MB2JXTG',
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then(response => {
    //   res.send({link: response.data.link})
    // })
  })
  .catch((error) => {
    console.log('error: ', error)
  });

}