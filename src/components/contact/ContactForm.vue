<template>
    <div class="form-block">
        <h2 class="col-head form-label">Send a message</h2>

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
                label="Your name"
                :rules="[rules.required]"
                autocomplete="name"
                class="mb-4"
            ></v-text-field>

            <v-text-field
                v-model="form.email"
                label="Email address"
                type="email"
                :rules="[rules.required, rules.email]"
                autocomplete="email"
                class="mb-4"
            ></v-text-field>

            <v-text-field
                v-model="form.subject"
                label="Subject"
                :rules="[rules.required]"
                class="mb-4"
            ></v-text-field>

            <v-textarea
                v-model="form.message"
                label="Message"
                rows="6"
                :rules="[rules.required]"
                class="mb-4"
            ></v-textarea>

            <v-btn
                type="submit"
                color="accent"
                block
                size="large"
                :loading="submitting"
                :disabled="!formValid || cooldown"
            >{{ cooldown ? `Wait ${cooldownSeconds}s` : 'Send message' }}</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { useContactForm } from '../../composables/useContactForm'

const { form, formValid, submitting, cooldown, cooldownSeconds, rules, contactFormRef, handleSubmit } = useContactForm()
</script>

<style scoped>
.form-label {
    padding-bottom: 16px;
    border-bottom: var(--rule);
    margin-bottom: 28px;
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
