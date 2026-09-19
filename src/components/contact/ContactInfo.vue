<template>
    <aside class="info">
        <h2 class="col-head info-label">Direct lines</h2>

        <p class="prose info-intro">Email gets the fastest reply, usually within a day.</p>

        <dl class="info-list">
            <div class="info-row">
                <dt class="col-head">Email</dt>
                <dd>
                    <button type="button" class="copy fig" @click="copy(store.personal.email, 'Email')">
                        {{ store.personal.email }}
                    </button>
                </dd>
            </div>

            <div class="info-row">
                <dt class="col-head">Phone</dt>
                <dd>
                    <button type="button" class="copy fig" @click="copy(store.personal.phone, 'Phone number')">
                        {{ store.personal.phone }}
                    </button>
                </dd>
            </div>

            <div class="info-row">
                <dt class="col-head">Located</dt>
                <dd class="fig">{{ store.personal.location }}</dd>
            </div>

            <div class="info-row">
                <dt class="col-head">Elsewhere</dt>
                <dd>
                    <ul class="info-socials">
                        <li v-for="link in store.socialLinks" :key="link.name">
                            <a
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="fig"
                            >{{ link.name }}<span aria-hidden="true"> ↗</span></a>
                        </li>
                    </ul>
                </dd>
            </div>
        </dl>
    </aside>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

async function copy(text, label) {
    try {
        await navigator.clipboard.writeText(text)
        store.showSnackbar(`${label} copied`, 'success')
    } catch {
        store.showSnackbar('Could not copy. Select the text instead.', 'error')
    }
}
</script>

<style scoped>
.info-label {
    padding-bottom: 16px;
    border-bottom: var(--rule);
    margin-bottom: 24px;
}

.info-intro {
    font-size: 0.95rem;
    margin-bottom: 24px;
}

.info-list {
    border-top: var(--rule);
}

.info-row {
    padding: 16px 0;
    border-bottom: var(--rule);
}

.info-row dt {
    margin-bottom: 6px;
}

.info-row dd {
    font-size: 0.88rem;
    color: rgb(var(--v-theme-on-background));
}

/* Click-to-copy reads as a value, not a button — the hover rule is the hint. */
.copy {
    font-size: inherit;
    color: inherit;
    background: none;
    border: none;
    border-bottom: 1px dashed rgba(var(--v-theme-on-surface), 0.35);
    padding: 0;
    cursor: copy;
    transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .copy:hover {
        color: rgb(var(--v-theme-accent));
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}


.info-socials {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
}

.info-socials a {
    color: rgb(var(--v-theme-accent));
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .info-socials a:hover {
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}

</style>
