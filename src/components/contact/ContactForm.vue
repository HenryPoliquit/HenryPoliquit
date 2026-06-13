<template>
    <v-card class="contact-card fade-in" elevation="8">
        <v-card-title class="form-card-title pa-6">
            <v-icon icon="mdi-email-edit" start color="accent"></v-icon>
            Send Me a Message
        </v-card-title>
        <v-card-text class="pa-6">
            <v-form ref="contactFormRef" v-model="formValid" @submit.prevent="handleSubmit">
                <!-- Honeypot: hidden from humans, bots fill it and get silently dropped -->
                <div class="hp-field" aria-hidden="true">
                    <label for="hp-website">Website</label>
                    <input
                        id="hp-website"
                        v-model="form.website"
                        type="text"
                        name="website"
                        tabindex="-1"
                        autocomplete="off"
                    />
                </div>

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
                    :disabled="!formValid || cooldown"
                    class="mt-2"
                >
                    <v-icon icon="mdi-send" start></v-icon>
                    {{ cooldown ? `Wait ${cooldownSeconds}s…` : 'Send Message' }}
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useContactForm } from '../../composables/useContactForm'

const { form, formValid, submitting, cooldown, cooldownSeconds, rules, contactFormRef, handleSubmit } = useContactForm()
</script>

<style scoped>
.contact-card {
    border-top: 3px solid rgb(var(--v-theme-accent));
    background: rgb(var(--v-theme-surface));
}

.form-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}

/* Honeypot — off-screen (not display:none, which some bots skip) */
.hp-field {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>
