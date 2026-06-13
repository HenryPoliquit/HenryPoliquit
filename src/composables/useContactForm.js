import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { usePortfolioStore } from '../stores/portfolio'

const COOLDOWN_DURATION = 30 // seconds

export function useContactForm() {
    const store = usePortfolioStore()
    const contactFormRef = ref(null)
    const formValid = ref(false)
    const submitting = ref(false)
    const cooldown = ref(false)
    const cooldownSeconds = ref(0)

    let cooldownTimer = null

    const form = ref({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '', // honeypot — real users never fill this
    })

    const rules = {
        required: value => !!value || 'This field is required',
        email: value => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return pattern.test(value) || 'Invalid email address'
        },
    }

    function startCooldown() {
        cooldown.value = true
        cooldownSeconds.value = COOLDOWN_DURATION
        cooldownTimer = setInterval(() => {
            cooldownSeconds.value--
            if (cooldownSeconds.value <= 0) {
                clearInterval(cooldownTimer)
                cooldown.value = false
                cooldownSeconds.value = 0
            }
        }, 1000)
    }

    const handleSubmit = async () => {
        if (!formValid.value || cooldown.value) return

        submitting.value = true

        try {
            const { error } = await supabase.from('messages').insert({
                name:    form.value.name,
                email:   form.value.email,
                subject: form.value.subject,
                message: form.value.message,
                website: form.value.website,
            })

            if (error) throw error

            store.showSnackbar("Message sent! I'll get back to you soon. 📬", 'success', 'mdi-email-check')
            form.value = { name: '', email: '', subject: '', message: '', website: '' }
            contactFormRef.value?.reset()
            startCooldown()
        } catch (err) {
            const isOffline = !navigator.onLine
            const isRateLimited = err?.code === 'PT429'
            const msg = isRateLimited
                ? 'Please wait a moment before sending another message.'
                : isOffline
                  ? 'No internet connection — please check your network.'
                  : 'Failed to send — please email me directly.'
            store.showSnackbar(msg, isRateLimited ? 'warning' : 'error', 'mdi-email-alert')
        } finally {
            submitting.value = false
        }
    }

    return { form, formValid, submitting, cooldown, cooldownSeconds, rules, contactFormRef, handleSubmit }
}
