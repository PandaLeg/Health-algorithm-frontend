import {ref} from "vue";

export default function () {
    const clinics = ref([])
    const page = ref(1)
    const perPage = ref(5)
    const totalPages = ref(0)

    return {
        clinics,
        page,
        perPage,
        totalPages
    }
}
