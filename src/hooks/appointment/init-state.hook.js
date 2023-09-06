import {ref} from "vue";

export default function () {
    const appointments = ref([])
    const page = ref(1)
    const perPage = ref(10)
    const totalPages = ref(0)


    return {
        appointments,
        page,
        perPage,
        totalPages
    }
}
