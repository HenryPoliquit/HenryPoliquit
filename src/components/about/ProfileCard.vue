<template>
    <section class="profile">
        <div class="profile-photo">
            <img
                v-if="!imgFailed"
                :src="store.personal.avatarUrl"
                :alt="`${store.personal.name}, portrait`"
                width="220"
                height="264"
                loading="lazy"
                decoding="async"
                @error="imgFailed = true"
            />
            <div v-else class="profile-fallback" aria-hidden="true">PHP</div>
        </div>

        <div class="profile-body">
            <p class="prose">{{ store.personal.bio }}</p>

            <dl class="profile-meta">
                <div>
                    <dt class="col-head">Based in</dt>
                    <dd class="fig">{{ store.personal.location }}</dd>
                </div>
                <div>
                    <dt class="col-head">Status</dt>
                    <dd class="fig" :class="store.personal.available ? 'is-open' : ''">
                        {{ store.personal.available ? 'Open to work' : 'Not looking' }}
                    </dd>
                </div>
            </dl>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
// `profile.jpg` may not exist yet — fall back to the monogram rather than a
// broken-image glyph.
const imgFailed = ref(false)
</script>

<style scoped>
.profile {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    column-gap: 48px;
    align-items: start;
}

.profile-photo img {
    display: block;
    width: 220px;
    height: 264px;
    object-fit: cover;
    border: var(--rule);
    filter: grayscale(1) contrast(1.05);
}

.profile-fallback {
    display: grid;
    place-items: center;
    width: 220px;
    height: 264px;
    border: var(--rule);
    background: rgb(var(--v-theme-surface));
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 700;
    font-stretch: 76%;
    letter-spacing: 0.06em;
    color: rgb(var(--v-theme-on-surface-variant));
}

.profile-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 56px;
    margin-top: 32px;
    padding-top: 20px;
    border-top: var(--rule);
}

.profile-meta dt {
    margin-bottom: 6px;
}

.profile-meta dd {
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-background));
}

.profile-meta .is-open {
    color: rgb(var(--v-theme-success));
}

@media (max-width: 760px) {
    .profile {
        grid-template-columns: minmax(0, 1fr);
        row-gap: 28px;
    }

    .profile-photo img,
    .profile-fallback {
        width: 160px;
        height: 192px;
    }

    .profile-fallback { font-size: 2.2rem; }
}
</style>
