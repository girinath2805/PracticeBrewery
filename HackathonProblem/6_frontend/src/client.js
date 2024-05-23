import {createClient} from '@sanity/client'


export const client = createClient({
    projectId : 'ndryhu08',
    dataset : 'production',
    useCdn : true,
    apiVersion: '2021-10-21',
    token: 'sksezmX38eCkV620lXuOARMQTaYxURb7Gg58jWJkM93R2VrG1rRQC0H4XcbXssIqULB2R1Rtw8pvg7XqkiRpqa8tiBDYKO5aTbtcI9THcLpnGkjm6oc3m98XYwmB7YuR9hHRSaL1wRZIk2uiy6nur0R81TuU1V4E69smmKKmm94je4fr1oDw'
});
