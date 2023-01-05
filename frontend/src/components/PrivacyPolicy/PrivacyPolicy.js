import NavigationSidebar from "../NavigationSidebar";
import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="policy"/>
            </div>
            <div className="col-10"
                 style={{"position": "relative"}}>
                <h1>Privacy Policy</h1>
                <h3> Information Collection and Use: </h3>
                <p>
                    We are collecting personal registration information and any information relative to a user's
                    interaction with a certain movie they view including likes and comments. Personal registration
                    information is primarily for registration and login use, which include username, password, first and
                    last name, and email address. This information is stored in our local database and inaccessible by
                    any third party. Website visitors will not be given an option to view the personal information of
                    other users.
                    Furthermore, we do collect any information relative to a user’s interaction with a movie. For
                    example, anything a user does to interact with a movie including likes and comments will be shared
                    with any website visitor on the user’s specific profile. When a user comments and likes, they agree
                    to make this information public.
                </p>
                <h3> Personal Information Purpose: </h3>
                <p>
                The purpose of this search engine is to give visitors the opportunity to get information on different
                movies, like, read, and write reviews. The primary product of this website is the sharing of reviews
                with other users. In general, we seek to give viewers a better impression on what they want to watch
                next and information on any movie they search. The purpose of making comments and likes public is to
                share information any user requires to other users and build a community of reviews for movies. Any user
                login information will be confidential to the specific user; however, users agree when commenting and
                liking that this respective information will be available to any other website visitor.
                </p>

                <h3> Personal Storage and User Control: </h3>
                <p>
                This information will all be stored in an external database. User protected data will not be made
                available on the website. Shared data like reviews and likes will be. Users have access to their
                personal information. They can edit most of their personal information including first and last name and
                email address. Shared data can also be edited. Users can unlike a movie and edit the comments they have
                made on a specific movie’s details page.
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy;