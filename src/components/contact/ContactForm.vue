<template>
    <v-card class="contact-card fade-in" elevation="8">
        <v-card-title class="text-h5 font-weight-bold pa-6 bg-primary text-white">
            <v-icon icon="mdi-email-edit" start></v-icon>
            Send Me a Message
        </v-card-title>
        <v-card-text class="pa-6">
            <v-form ref="contactFormRef" v-model="formValid" @submit.prevent="handleSubmit">
                <v-text-field
                    v-model="form.name"
                    label="Your Name"
                    placeholder="John Doe"
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-account"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="form.email"
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    prepend-inner-icon="mdi-email"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="form.subject"
                    label="Subject"
                    placeholder="Project Inquiry"
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-comment-text"
                    class="mb-4"
                ></v-text-field>

                <v-textarea
                    v-model="form.message"
                    label="Message"
                    placeholder="Tell me about your project..."
                    rows="5"
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-message-text"
                    class="mb-4"
                ></v-textarea>

                <v-btn
                    type="submit"
                    color="accent"
                    block
                    size="large"
                    :loading="submitting"
                    :disabled="!formValid"
                    class="mt-2"
                >
                    <v-icon icon="mdi-send" start></v-icon>
                    Send Message
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useContactForm } from '../../composables/useContactForm'

const { form, formValid, submitting, rules, contactFormRef, handleSubmit } = useContactForm()
</script>

<style scoped>
.contact-card {
    border-top: 4px solid #00BCD4;
}
</style>
