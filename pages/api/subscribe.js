import axios from 'axios'

const { MAILCHIMP_SECRET: secret } = process.env
console.log(secret)

export default async (req, res) => {
  const email = req.body.emailAddress
  console.log(email)
	try {
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': secret,
      },
      url: 'https://us6.api.mailchimp.com/3.0/lists/dc5f33bb49/members',
      data: {
        email_address: email,
        status: 'subscribed'
      }
    })

    if (response.status === 200) {
      res.statusCode = 200
      res.end()
    } else {
      res.statusCode = 400
      res.end()
    }
  } catch { }
}