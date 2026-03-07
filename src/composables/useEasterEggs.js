import { onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const KONAMI = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
]

export function useEasterEggs() {
    const store = usePortfolioStore()
    let sequence = []

    function onKeyDown(e) {
        // Normalize letters to lowercase so Caps Lock / Shift don't break the sequence
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
        sequence.push(key)
        if (sequence.length > KONAMI.length) sequence.shift()

        if (sequence.join(',') === KONAMI.join(',')) {
            sequence = []
            store.showSnackbar(
                '🎮 Konami Code! You\'re one of us.',
                'accent',
                'mdi-gamepad-variant'
            )
            console.log(
                '%c🎮 Konami Code activated! Nice moves.',
                'color:#6272F5;font-size:14px;font-weight:bold;'
            )
            console.log(
                '%cType window.portfolio to explore the site data.',
                'color:#aaa;font-size:12px;'
            )
        }
    }

    onMounted(() => window.addEventListener('keydown', onKeyDown))
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
}
