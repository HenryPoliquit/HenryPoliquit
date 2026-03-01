<template>
    <v-main>
        <div class="not-found-wrapper d-flex align-center justify-center">
            <div class="text-center px-4">
                <h1 class="error-code text-gradient-cyan">404</h1>
                <p class="text-h5 text-white font-weight-medium mb-2">Page not found</p>
                <p class="text-body-1 mb-8" style="opacity: 0.6; color: white;">
                    Looks like this route doesn't exist.
                </p>
                <v-btn color="accent" size="large" to="/" class="px-8 text-primary">
                    <v-icon icon="mdi-home" start></v-icon>
                    Back to Home
                </v-btn>
            </div>
        </div>
    </v-main>
</template>

<style scoped>
.not-found-wrapper {
    min-height: calc(100vh - 72px);
    background: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
}

.error-code {
    font-size: clamp(6rem, 20vw, 12rem);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>
