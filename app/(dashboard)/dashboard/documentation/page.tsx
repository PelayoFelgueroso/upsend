import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Book, Zap, Shield } from "lucide-react"
import { CodeBlock } from "@/dashboard/documentation/components/CodeBlock"
import { ApiEndpoint } from "@/dashboard/documentation/components/ApiEndpoint"


export default function DocumentationPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600 mt-2">
            Complete guide to integrate EmailPro into your application
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          v2.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="#getting-started" className="block text-sm text-blue-600 hover:underline">
                Getting Started
              </a>
              <a href="#authentication" className="block text-sm text-blue-600 hover:underline">
                Authentication
              </a>
              <a href="#sending-emails" className="block text-sm text-blue-600 hover:underline">
                Sending Emails
              </a>
              <a href="#templates" className="block text-sm text-blue-600 hover:underline">
                Templates
              </a>
              <a href="#webhooks" className="block text-sm text-blue-600 hover:underline">
                Webhooks
              </a>
              <a href="#sdks" className="block text-sm text-blue-600 hover:underline">
                SDKs
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {/* Getting Started */}
          <section id="getting-started">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-blue-600" />
                  <CardTitle>Getting Started</CardTitle>
                </div>
                <CardDescription>
                  Learn how to integrate EmailPro API into your application in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                  <CodeBlock
                    language="text"
                    code="https://api.emailpro.com/v2"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Example</h3>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="javascript">
                      <CodeBlock
                        language="javascript"
                        code={`// Install: npm install @emailpro/sdk
import { EmailPro } from '@emailpro/sdk';

const client = new EmailPro({
  apiKey: 'your-api-key-here'
});

// Send a simple email
const result = await client.emails.send({
  to: 'user@example.com',
  from: 'hello@yourapp.com',
  subject: 'Welcome to our app!',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
});

console.log('Email sent:', result.id);`}
                      />
                    </TabsContent>
                    
                    <TabsContent value="python">
                      <CodeBlock
                        language="python"
                        code={`# Install: pip install emailpro-python
from emailpro import EmailPro

client = EmailPro(api_key='your-api-key-here')

# Send a simple email
result = client.emails.send(
    to='user@example.com',
    from_email='hello@yourapp.com',
    subject='Welcome to our app!',
    html='<h1>Welcome!</h1><p>Thanks for signing up.</p>'
)

print(f'Email sent: {result.id}')`}
                      />
                    </TabsContent>
                    
                    <TabsContent value="curl">
                      <CodeBlock
                        language="bash"
                        code={`curl -X POST https://api.emailpro.com/v2/emails \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "hello@yourapp.com",
    "subject": "Welcome to our app!",
    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
  }'`}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Authentication */}
          <section id="authentication">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <CardTitle>Authentication</CardTitle>
                </div>
                <CardDescription>
                  Secure your API requests with API keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">API Key Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    All API requests must include your API key in the Authorization header:
                  </p>
                  <CodeBlock
                    language="bash"
                    code={`Authorization: Bearer your-api-key-here`}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Security Best Practices</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Never expose your API key in client-side code</li>
                    <li>• Use environment variables to store your API key</li>
                    <li>• Rotate your API keys regularly</li>
                    <li>• Use different API keys for different environments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Sending Emails */}
          <section id="sending-emails">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <CardTitle>Sending Emails</CardTitle>
                </div>
                <CardDescription>
                  Send transactional and marketing emails with our powerful API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiEndpoint
                  method="POST"
                  endpoint="/emails"
                  description="Send a single email"
                />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Request Body</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "to": "recipient@example.com",
  "from": "sender@yourapp.com",
  "subject": "Your email subject",
  "html": "<h1>HTML content</h1>",
  "text": "Plain text content",
  "attachments": [
    {
      "filename": "invoice.pdf",
      "content": "base64-encoded-content",
      "contentType": "application/pdf"
    }
  ],
  "tags": ["welcome", "onboarding"],
  "metadata": {
    "user_id": "12345",
    "campaign": "welcome_series"
  }
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Response</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "id": "email_1234567890",
  "status": "queued",
  "created_at": "2024-01-15T10:30:00Z",
  "scheduled_at": null
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Bulk Email Sending</h3>
                  <ApiEndpoint
                    method="POST"
                    endpoint="/emails/batch"
                    description="Send multiple emails in a single request"
                  />
                  <CodeBlock
                    language="javascript"
                    code={`const result = await client.emails.sendBatch([
  {
    to: 'user1@example.com',
    from: 'hello@yourapp.com',
    subject: 'Welcome {{name}}!',
    html: '<h1>Welcome {{name}}!</h1>',
    variables: { name: 'John' }
  },
  {
    to: 'user2@example.com',
    from: 'hello@yourapp.com',
    subject: 'Welcome {{name}}!',
    html: '<h1>Welcome {{name}}!</h1>',
    variables: { name: 'Jane' }
  }
]);`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Templates */}
          <section id="templates">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Create reusable email templates with dynamic content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Using Templates</h3>
                  <CodeBlock
                    language="javascript"
                    code={`// Send email using a template
const result = await client.emails.sendTemplate({
  to: 'user@example.com',
  template: 'welcome-email',
  variables: {
    name: 'John Doe',
    company: 'Acme Corp',
    activation_url: 'https://yourapp.com/activate/abc123'
  }
});`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Template Variables</h3>
                  <p className="text-gray-600 mb-4">
                    Use double curly braces to insert variables into your templates:
                  </p>
                  <CodeBlock
                    language="html"
                    code={`<h1>Welcome {{name}}!</h1>
<p>Thanks for joining {{company}}.</p>
<a href="{{activation_url}}">Activate your account</a>

<!-- Conditional content -->
{{#if premium}}
  <p>You have premium access!</p>
{{/if}}

<!-- Loops -->
{{#each items}}\
  <li>{{this.name}} - {{this.price}}</li>
{{/each}}`}
                  />
                </div>

                <ApiEndpoint
                  method="GET"
                  endpoint="/templates"
                  description="List all templates"
                />

                <ApiEndpoint
                  method="POST"
                  endpoint="/templates"
                  description="Create a new template"
                />
              </CardContent>
            </Card>
          </section>

          {/* Webhooks */}
          <section id="webhooks">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Receive real-time notifications about email events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Webhook Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-green-600">email.delivered</h4>
                      <p className="text-sm text-gray-600">Email was successfully delivered</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-600">email.opened</h4>
                      <p className="text-sm text-gray-600">Recipient opened the email</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-purple-600">email.clicked</h4>
                      <p className="text-sm text-gray-600">Recipient clicked a link</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-red-600">email.bounced</h4>
                      <p className="text-sm text-gray-600">Email bounced or failed</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Webhook Payload</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "event": "email.delivered",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "email_id": "email_1234567890",
    "recipient": "user@example.com",
    "subject": "Welcome to our app!",
    "tags": ["welcome", "onboarding"],
    "metadata": {
      "user_id": "12345"
    }
  }
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Webhook Handler Example</h3>
                  <CodeBlock
                    language="javascript"
                    code={`// Express.js webhook handler
app.post('/webhooks/emailpro', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'email.delivered':
      console.log(\`Email \${data.email_id} delivered to \${data.recipient}\`);
      break;
    case 'email.opened':
      // Track email opens in your analytics
      analytics.track('Email Opened', {
        email_id: data.email_id,
        recipient: data.recipient
      });
      break;
    case 'email.bounced':
      // Handle bounced emails
      await handleBouncedEmail(data);
      break;
  }
  
  res.status(200).send('OK');
});`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SDKs */}
          <section id="sdks">
            <Card>
              <CardHeader>
                <CardTitle>Official SDKs</CardTitle>
                <CardDescription>
                  Use our official SDKs for faster integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">JavaScript/Node.js</h3>
                    <CodeBlock
                      language="bash"
                      code="npm install @emailpro/sdk"
                    />
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Python</h3>
                    <CodeBlock
                      language="bash"
                      code="pip install emailpro-python"
                    />
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">PHP</h3>
                    <CodeBlock
                      language="bash"
                      code="composer require emailpro/emailpro-php"
                    />
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Ruby</h3>
                    <CodeBlock
                      language="bash"
                      code="gem install emailpro"
                    />
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
