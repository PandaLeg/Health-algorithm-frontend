import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import routesNames from "../../router/routesNames";
import {useRouter} from "vue-router";

export default function (v$, user, isValid, type, image = null, locations = [], isValidLocation) {
    const store = useStore()
    const router = useRouter()

    const registrationUser = async () => {
        v$.value.$touch()

        if (!v$.value.$invalid && isValid() && (type === 'clinic' ? isValidLocation() : true)) {
            try {
                const formData = new FormData();
                formData.append('phone', user.phone);
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('type', type);

                if (type === 'clinic') {
                    user.clinic.locations = formLocations(locations)
                }

                if (image) {
                    formData.append('image', image.value);
                }

                formData.append(type, JSON.stringify(user[type]))

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

function formLocations(locations) {
    const clinicLocations = []

    locations.value.forEach(location => {
        const addresses = []

        const clinicLocation = clinicLocations.find(el => el.city === location.city)

        if (clinicLocation) {
            const newLocation = {
                city: location.city,
                addresses: [...clinicLocation.addresses, location.address]
            }

            const locationIndex = clinicLocations.findIndex(el => el.city === location.city)

            clinicLocations.splice(locationIndex, 1, newLocation)
        } else {
            addresses.push(location.address)

            const newLocation = {
                city: location.city,
                addresses
            }

            clinicLocations.push(newLocation)
        }

    })

    return clinicLocations
}
