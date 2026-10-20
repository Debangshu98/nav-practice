import { useState, type FormEvent } from 'react'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSubmitted(true)
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setTopic('General Inquiry')
    setMessage('')
    setSubmitted(false)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="pill-badge">Support & Inquiries</span>
          <h1>Get in Touch</h1>
          <p>Have a question or feedback about the navigation experience? Drop us a message.</p>
        </div>
      </div>

      <div className="contact-layout">
        <section className="panel-card">
          {submitted ? (
            <div className="submission-success" role="status">
              <h2>Message Sent!</h2>
              <p>
                Thanks, <strong>{name}</strong>. We have received your{' '}
                <strong>{topic}</strong> message and will reply to{' '}
                <code>{email}</code> shortly.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <label className="form-field">
                <span>Your Name</span>
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="form-field">
                <span>Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="form-field">
                <span>Topic</span>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </label>

              <label className="form-field">
                <span>Message</span>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          )}
        </section>

        <aside className="contact-sidebar">
          <div className="feature-card">
            <h3>Direct Channels</h3>
            <p>Email: support@navflow.demo</p>
            <p>Hours: Mon–Fri, 9:00 AM – 6:00 PM UTC</p>
          </div>
          <div className="feature-card">
            <h3>Keyboard Shortcuts</h3>
            <p>
              Use <code>Alt + 1</code> through <code>Alt + 5</code> at any time to
              switch between pages instantaneously.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
