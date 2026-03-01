import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import { usePortfolioStore } from '../stores/portfolio'

const SERVICE_ID  = 'service_05uptif'
const TEMPLATE_ID = 'template_n4ib3bf'

export function useContactForm() {
    const store = usePortfolioStore()
    const contactFormRef = ref(null)
    const formValid = ref(false)
    const submitting = ref(false)

    const form = ref({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const rules = {
        required: value => !!value || 'This field is required',
        email: value => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return pattern.test(value) || 'Invalid email address'
        },
    }

    const handleSubmit = async () => {
        if (!formValid.value) return

        submitting.value = true

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name:  form.value.name,
                from_email: form.value.email,
                subject:    form.value.subject,
                message:    form.value.message,
            })

            store.showSnackbar("Message sent! I'll get back to you soon. 📬", 'success', 'mdi-email-check')
            form.value = { name: '', email: '', subject: '', message: '' }
            contactFormRef.value?.reset()
        } catch {
            store.showSnackbar('Failed to send — please email me directly.', 'error', 'mdi-email-alert')
        } finally {
            submitting.value = false
        }
    }

    return { form, formValid, submitting, rules, contactFormRef, handleSubmit }
}
