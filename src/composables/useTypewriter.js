import { ref, onMounted, onUnmounted } from 'vue'

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
            typewriterTimeout = setTimeout(typeWriter, 110)
        } else if (isDeleting && charIndex > 0) {
            typewriterText.value = currentWord.substring(0, charIndex - 1)
            charIndex--
            typewriterTimeout = setTimeout(typeWriter, 60)
        } else if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true
            typewriterTimeout = setTimeout(typeWriter, 1500)
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            wordIndex = (wordIndex + 1) % words.length
            typewriterTimeout = setTimeout(typeWriter, 500)
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
