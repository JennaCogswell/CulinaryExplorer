<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->



# CSCI 4177 - Culinary Explorer

For our term project we are proposing a web app called Culinary Explorer. Culinary Explorer will allow users to create accounts, browse popular recipes uploaded by all users. upload their own recipes, search for specific recipes, filter the recipes by category, view their profile page, interact with recipe postings by liking, rating, and saving recipes. 

* *Date Created*: 21 02 2024
* *Last Modification Date*: 03 04 2024
* *Vercel Deployment URL*: <https://csci4177-group-project.vercel.app/>
* *Git Group Project URL*: <https://git.cs.dal.ca/sarty/G19-CSCI4177.git>



## Authors


* [Jenna Cogswell](jenna.c@dal.ca) - *(Created navbar components, completed search function, completed recipe details page front end, completed follow/unfollow feature, some error and styling fixes throughout as needed)*
* [Adam Sarty](adamsarty@dal.ca) - *(Created components for the food categories in navbar, profile details page, profile update page, completed post/delete for user statistics, some error and styling fixes as needed)*
* [Vrishti Dawra](vdawra@dal.ca) - *(Created footer component to be used accross all pages- styled using Tailwind CSS)*
* [Adam Melvin](adam.melvin@dal.ca) - *(About section and FAQ section and that pages nav)*
* [Ayush Patel](ay654140@dal.ca) - *(Home page news section, and about page contact section)*
* [Santi Rijal](sn655109@dal.ca) - *(Landing page and touch ups)*


### Prerequisites

To have a local copy of this lab / assingnment / project up and running on your local machine, you will open the react app folder and run:

```
npm install
```

This will install all the dependencies from the package.json file.

To run this locally you will also need to create a .env.local file holding the mongo connection string, please contact a group member if needed.


## Deployment

Deployed using [Vercel](https://vercel.com/).



## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [React](https://react.dev/) - Front-End JavaScript Library
* [Next.js](https://nextjs.org/) - Web Development Framework
* [Tailwind](https://tailwindcss.com/) - CSS Framework
* [MongoDB Atlas](https://www.mongodb.com) - NoSQL database


## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.


### components/SearchBar.jsx

*Lines 114 - 123*

```
  // function to filter search suggestions list as input is entered
  const filteredSuggestions = popularKeywords.filter((item) => {
    if (searchInput === "") {
      return item;
    } else {
      var itemLower = item.value.toLowerCase();
      var searchInputLower = searchInput.toLowerCase();
      return itemLower.includes(searchInputLower);
    }
  });


```

```

{/* https://salehmubashar.com/blog/create-a-search-bar-in-react-js */}
{filteredSuggestions.map((item) => (
    <li key={item.key} className="hover:text-amber-200 block px-4 py-2">{item.value}</li>
))}

```

The code above was created by adapting the code in [Create a Search Bar in React JS - Filtering the data](https://salehmubashar.com/blog/create-a-search-bar-in-react-js) as shown below: 

```
import { React, useState } from 'react'
import data from "./ListData.json"

function List(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List


```

- The code in [Create a Search Bar in React JS - Filtering the data](https://salehmubashar.com/blog/create-a-search-bar-in-react-js) was implemented by utilizing the filter list function, as well as the dynamically listing of the data to display the filtered list of search suggestions.
- [Create a Search Bar in React JS - Filtering the data](https://salehmubashar.com/blog/create-a-search-bar-in-react-js)'s Code was used because I had yet to use the list .filter method, or dynamically listing in html, I used this resource to learn how they work.



### NavbarHeader.jsx

*Lines 108 - 185*

```
{/* https://headlessui.com/react/menu */}
            <Menu>
              <Menu.Button className="inline-flex h-full items-center text-2xl text-slate-50 hover:text-amber-200">
                <FiMenu />
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-8 pt-2 rounded-b-xl bg-neutral-700 shadow-lg text-slate-50 overflow-visible -translate-x-2/3">
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link
                    href="/home"
                    className={`hover:text-light-gold ${
                      path === "/home" && "text-dark-gold"
                    }`}
                  >
                    Home
                  </Link>
                </Menu.Item>

                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link
                    href="/about"
                    className={`hover:text-light-gold ${
                      path === "/about" && "text-dark-gold"
                    }`}
                  >
                    About
                  </Link>
                </Menu.Item>

                {session.status === "authenticated" ? (
                  <>
                    <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                      <Link
                        href={"/fyp"}
                        className={`hover:text-light-gold ${
                          path === "/fyp" && "text-dark-gold"
                        }`}
                      >
                        FYP
                      </Link> 
                    </Menu.Item> 
                    <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                      <Link
                        href={"/profile"}
                        className={`hover:text-light-gold ${
                          path === "/profile" && "text-dark-gold"
                        }`}
                      >
                        {session?.data?.user?.name}
                      </Link>
                    </Menu.Item>
                    <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                      <Link
                        href={"/post"}
                        className={`hover:text-light-gold ${
                          path === "/post" && "text-dark-gold"
                        }`}
                      >
                        Post
                      </Link>
                    </Menu.Item>
                    <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                      <span
                        onClick={handleLogout}
                        className="hover:text-light-gold cursor-pointer"
                      >
                        Logout
                      </span>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                      <Link href="/login">Login</Link>
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Menu>

```

The code above was created by adapting the code in [headlessUI](https://headlessui.com/react/menu) as shown below: 

```
import { Menu } from '@headlessui/react'

function MyDropdown() {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>

      {/*
        By default, the `Menu.Items` will automatically show/hide
        when the `Menu.Button` is pressed.
      */}
      <Menu.Items>
        <Menu.Item>{/* ... */}</Menu.Item>
        {/* ... */}
      </Menu.Items>
    </Menu>
  )
}

```

- The code in [headlessUI](https://headlessui.com/react/menu) was implemented by utilizing the Menu dropdown component to create header dropdown menus.
- [headlessUI](https://headlessui.com/react/menu)'s Code was used because I was looking for a way to easily create the functionality of a dropdown menu in React.

### getmessages/route.js, sendmessage/route.js

- The code in these files was made with some refference to https://medium.com/@sabhya12.saini/creating-chat-feature-using-react-js-mongodb-realm-and-node-js-d8b61292742c
- My code is largely modified, but I used this article to learn how to structure a messaging feature like this. 
