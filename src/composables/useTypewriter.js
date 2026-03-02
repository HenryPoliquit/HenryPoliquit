/**
 * Composable that cycles through an array of words with a typewriter effect.
 * Automatically cleans up timers on unmount.
 *
 * @param {string[]} words - Words to cycle through
 * @returns {{ typewriterText: import('vue').Ref<string>, showCursor: import('vue').Ref<boolean> }}
 */
import { ref, onMounted, onUnmounted } from 'vue'

const TYPING_SPEED = 110       // ms per character while typing
const DELETING_SPEED = 60      // ms per character while deleting
const PAUSE_AFTER_WORD = 1500  // ms to pause when word is fully typed
const PAUSE_BEFORE_NEXT = 500  // ms to pause before typing the next word

export function useTypewriter(words) {
    const typewriterText = ref('')
    const showCursor = ref(true)

    let typewriterTimeout
    let cursorInterval
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typeWriter = () => {
        const currentWord = words[wordIndex]

        if (!isDeleting && charIndex < currentWord.length) {
            typewriterText.value = currentWord.substring(0, charIndex + 1)
            charIndex++
            typewriterTimeout = setTimeout(typeWriter, TYPING_SPEED)
        } else if (isDeleting && charIndex > 0) {
            typewriterText.value = currentWord.substring(0, charIndex - 1)
            charIndex--
            typewriterTimeout = setTimeout(typeWriter, DELETING_SPEED)
        } else if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true
            typewriterTimeout = setTimeout(typeWriter, PAUSE_AFTER_WORD)
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            wordIndex = (wordIndex + 1) % words.length
            typewriterTimeout = setTimeout(typeWriter, PAUSE_BEFORE_NEXT)
        }
    }

    onMounted(() => {
        typeWriter()
        cursorInterval = setInterval(() => {
            showCursor.value = !showCursor.value
        }, 500)
    })

    onUnmounted(() => {
        clearTimeout(typewriterTimeout)
        clearInterval(cursorInterval)
    })

    return { typewriterText, showCursor }
}
