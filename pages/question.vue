<template>
    <div class="flex flex-col items-center">

        <form @submit.prevent="onSubmitForm" class="w-10/12 flex flex-col gap-6">

            <div class="flex flex-col gap-2">
                <label for="school" class="font-bold text-xl">Where did you go to school?</label>
                <input type="text" placeholder="Add name of school or university" class="outline outline-1 outline-gray-400 rounded-md p-2">
            </div>

            <div class="flex flex-col gap-2">
                <label for="about_me" class="font-bold text-xl">About me?</label>
                <input type="text" placeholder="Add something about you" class="outline outline-1 outline-gray-400 rounded-md p-2">
            </div>

            <div class="flex flex-col gap-2">
                <label for="height" class="font-bold text-xl">How tall are you?</label>
                <input type="number" placeholder="height" class="outline outline-1 outline-gray-400 rounded-md p-2 w-24">
            </div>

            <div class="flex flex-col gap-2">
                <label for="age" class="font-bold text-xl">Age</label>
                <span class="text-gray-500">How old are there?</span>
                <div class="flex items-center justify-start gap-4">
                    <input type="text" placeholder="18" class="outline outline-1 outline-gray-400 rounded-md w-16 pl-2">
                    To
                    <input type="text" placeholder="100" class="outline outline-1 outline-gray-400 rounded-md w-16 pl-2">
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label for="distance" class="font-bold text-xl">Distance</label>
                <span class="text-gray-500">How far away do they live?</span>
                <input type="number" class="outline outline-1 outline-gray-400 rounded-md w-20 px-2 py-0.5">
            </div>

            <div class="flex flex-col gap-2">
                <label for="" class="font-bold text-xl">Height</label>
                <span class="text-gray-500">How tall are they?</span>
                <input type="number" class="outline outline-1 outline-gray-400 rounded-md p-2 w-24">
            </div>


            <div class="flex flex-col gap-2">
                <label for="goals" class="font-bold text-xl">Whar are you looking for?</label>
                <div class="flex flex-col gap-2">

                    <div class="flex gap-5">
                        <input type="radio" id="goals_1" name="goals" v-model="formData.goals" value="Marriage" class="hidden">
                            <label for="goals_1" class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center">Marriage</label>

                        <input type="radio" id="goals_2" name="goals" v-model="formData.goals" value="A serious relationship" class="hidden">
                            <label for="goals_2" class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center">A serious relationship</label>

                        <input type="radio" id="goals_3" name="goals" v-model="formData.goals" value="Something casual" class="hidden">
                            <label for="goals_3" class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center">Something casual</label>

                    </div>
                  
                    <div class="flex gap-5">
                        <input type="radio" id="goals_4" name="goals" v-model="formData.goals" value="Prefer not ot say" class="hidden">
                            <label for="goals_4" class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center">Prefer not ot say</label>

                        <input type="radio" id="goals_5" name="goals" v-model="formData.goals" value="Not sure yet" class="hidden">
                            <label for="goals_5" class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center">Not sure yet</label>
                    </div>

                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label for="smoking" class="font-bold text-xl">Smoking?</label>
                <div class="flex gap-5 w-4/5">
                    <input type="radio" id="smoking_1" name="goals" v-model="formData.smoking" value="Smoker" class="hidden">
                        <label for="smoking_1" class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center">Smoker</label>

                    <input type="radio" id="smoking_2" name="goals" v-model="formData.smoking" value="Non-smoker" class="hidden">
                        <label for="smoking_2" class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center">Non-smoker</label>

                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label for="drinking" class="font-bold text-xl">Drinking?</label>
                <div class="flex gap-5 w-4/5">
                    <input type="radio" id="drinking_1" name="drinking" v-model="formData.drinking" value="Sober curious" class="hidden">
                        <label for="drinking_1" class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center">Sober curious</label>

                    <input type="radio" id="drinking_2" name="drinking" v-model="formData.drinking" value="Socially" class="hidden">
                        <label for="drinking_2" class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center">Socially</label>
                        
                    <input type="radio" id="drinking_3" name="drinking" v-model="formData.drinking" value="Never drink" class="hidden">
                        <label for="drinking_3" class="flex flex-col h-10 w-32 border-2 cursor-pointer rounded-full justify-center items-center">Never drink</label>

                </div>
            </div>

            <br>
            
            
        </form>


    </div>
</template>

<script setup>
    
    const formData = ref({
        goals : ""
    })

    const onSubmitForm = ()=>{
        console.log(formData)
    }

</script>