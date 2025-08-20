import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// EmailJS configuration
const SERVICE_ID = 'service_myktmp4';
const TEMPLATE_ID = 'template_wc0393i';
const PUBLIC_KEY = 'QqKVHtDTlzVHL0N1Z';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    if (!form.current) return;

    // Atualiza o valor do campo phone manualmente antes de enviar
    const phoneInput = form.current.elements.namedItem('phone') as HTMLInputElement;
    if (phoneInput) phoneInput.value = phone;

    const subjectInput = form.current.elements.namedItem('subject') as HTMLInputElement;
    if (subjectInput) subjectInput.value = subject;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        form.current?.reset();
        setPhone('');
        setSubject('');
        toast({
          title: t('contact.successTitle'),
          description: t('contact.successMessage'),
          variant: 'default',
        });
      }, (error) => {
        setStatus('error');
        toast({
          title: t('contact.errorTitle'),
          description: error.message || t('contact.errorMessage'),
          variant: 'destructive',
        });
      });
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6 max-w-xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.name')}
          </label>
          <input
            type="text"
            name="from_name"
            id="from_name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.email')}
          </label>
          <input
            type="email"
            name="from_email"
            id="from_email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.message')}
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center mt-2"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            {t('contact.form.sending')}
          </>
        ) : (
          t('contact.form.submit')
        )}
      </button>

      {status === 'success' && (
        <p className="text-green-600 mt-2 text-center">{t('contact.successMessage')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-2 text-center">{t('contact.errorMessage')}</p>
      )}
    </form>
  );
};

export default ContactForm;
