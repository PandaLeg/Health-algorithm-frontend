import {useStore} from "vuex";
import {vuexTypes} from "../../store/vuexTypes";
import {useRouter} from "vue-router";
import routesNames from "../../router/routesNames";

export default function (v$, user, isValid, type, image = null, locations, isValidLocation) {
    const store = useStore()
    const router = useRouter()

    const registrationUser = async () => {
        v$.value.$touch()

        const isValidType = type === 'clinic' || type === 'doctor'

        if (!v$.value.$invalid && isValid() && (isValidType ? isValidLocation() : true)) {
            try {
                const formData = new FormData();
                formData.append('phone', user.phone);
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('type', type);

                if (type === 'clinic') {
                    user.clinic.locations = formLocations(locations)
                }

                if (type === 'doctor') {
                    const workPlace = locations
                    user.doctor.workPlace = formDoctorWorkPlace(workPlace)
                    user.doctor.city = workPlace.city
                    user.doctor.price = user.doctor.price >= 10 ? Number(user.doctor.price) * 100 : 0
                }

                if (image) {
                    formData.append('image', image.value);
                }

                formData.append(type, JSON.stringify(user[type]))

                await store.dispatch(vuexTypes.REGISTER_USER, formData)

                router.push({name: routesNames.home.name})
            } catch (err) {
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

    locations.forEach(location => {
        const newBranch = formBranchWithSchedule(location.schedule, location)

        const clinicLocation = clinicLocations.find(el => el.city === location.city)

        if (clinicLocation) {
            const newLocation = {
                city: location.city,
                clinicBranches: [...clinicLocation.clinicBranches, newBranch]
            }

            const locationIndex = clinicLocations.findIndex(el => el.city === location.city)

            clinicLocations.splice(locationIndex, 1, newLocation)
        } else {
            const newLocation = {
                city: location.city,
                clinicBranches: [newBranch]
            }

            clinicLocations.push(newLocation)
        }

    })

    return clinicLocations
}

function formBranchWithSchedule(schedule, location) {
    const scheduleClinic = schedule.map(el => {
        if (el.dayType === 'Workday') {
            return {
                weekDays: [...el.weekDays],
                dayType: el.dayType,
                from: el.from,
                to: el.to
            }
        }
        return {
            weekDays: [...el.weekDays],
            dayType: el.dayType
        }
    })

    return {
        address: location.address,
        conveniences: location.conveniences,
        scheduleClinic
    }
}

function formDoctorWorkPlace(workPlace) {
    return {
        id: workPlace.address,
        schedule: workPlace.schedule.map(sh => ({
            weekDayId: sh.weekDay,
            from: sh.from,
            to: sh.to,
            duration: sh.duration
        }))
    }
}
