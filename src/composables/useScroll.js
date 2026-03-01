import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
    const scrolled = ref(false)

    const handleScroll = () => {
        scrolled.value = window.scrollY > 20
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return { scrolled }
}
