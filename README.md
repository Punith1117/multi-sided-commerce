# Multi Sided Commerce
Where a user can do both - order products and delivery them

The user places an order -> product details are fetched from database that is hard-coded -> current user location is obtained -> order is made available to public to deliver. The delivery person cannot accept two different orders at the same time. The delivery updates are displayed to the user in real time and it ends when the delivery person enters otp given to customer.

This was my first time with mobile app development and also using something like supabase.

# [Try it out by downloading the android app (65 Mb)](https://expo.dev/accounts/punith17/projects/multi-sided-commerce/builds/142bc000-89b0-4056-9f52-f939711580f4) 

# Technologies
React Native, Supabase for database, Appwrite for authentication

# Learnings
- What is React Native? Basic tags in React Native
- Handling Real-Time data by subscribing to changes in database
- Getting current location from user with respect to latitudes and longitudes and converting it to postal address, sending notifications easily using Expo APIs
- Understanding Edge Functions, RLS policies in Supabase (though I haven't set it strictly for this app)

It was challenging for me to initially set up nested routes (Tabs, Stack and using altogether) using expo router(file based routing like NextJs unlike React router) but got used to it later.

I realized that learning React Native is easy for someone already familiar with React. Developing this app revised some of the important react hooks - useEffect, useContext and useRef