import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import routesNames from "../../router/routesNames";
import {useRouter} from "vue-router";

export default function (v$, user, isValid, type, image = null) {
    const store = useStore()
    const router = useRouter()

    const registrationUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid()) {
            try {
                const formData = new FormData();
                formData.append('phone', user.phone);
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('city', user.city);
                formData.append('type', type);
                parseObjToFormData(user[type], formData, type)

                if (image) {
                    formData.append('image', image.value);
                }

                await store.dispatch(vuexTypes.REGISTER_USER, formData)

                router.push({name: routesNames.home.name})
            } catch (err) {
                console.log(err)
                store.commit(vuexTypes.UPDATE_NOTIFICATION, err.data?.message ?? 'Error')
            }
        }
    }

    return {
        registrationUser
    }
}

function parseObjToFormData(obj, formData, namespace) {
    const formKey = ''

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            const formKey = namespace + '[' + prop + ']'

            formData.append(formKey, obj[prop])
        }
    }
}
