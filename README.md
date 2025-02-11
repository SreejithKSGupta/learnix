# Learnix
- Online Learning Management system where your Learning is super charged.
- https://sreejithksgupta.github.io/learnix/

# todo

### UI
- Comprehensive UI, responsiveness and font updates

### optional
- github secrets
- SEO optimizationss
- duplication of methods in courses
- settings: email preferences, style preferences, user preferences [for student,tutor, etc]

### tried and refused
- implement SSR?
- caching images and json, then revalidate

### feature and bug testing
- Otp for sign in and forgot password
- comments on courses


- admin => can see courses, students and tutors, and enable/disable them. see messages
- tutor=> create new courses, see and edit existing courses, tutor panel
- student=>enroll and complete courses
- guest => view courses


## priority order
- OTP 
- admin/tutor/student [error correction]
- comprehensive UI updates
- comments in courses and blogs
- SEO optimizations
- messages should show in user dashboard from other users too
- removing/changing courses does not immediately reflect

## pushing to github
- ng build --base-href "https://sreejithksgupta.github.io/learnix/"
- ngh --dir=dist/learnix/browser


    <!-- "development": {
              "outputHashing": "all",
               "namedChunks": true,
              "optimization": true,
              "extractLicenses": true,
              "sourceMap": true
            } -->
