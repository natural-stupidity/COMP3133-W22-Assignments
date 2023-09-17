import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private apollo: Apollo) { }

  login(formValues: any) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query login($username: String!, $password: String!){
            login(
                username: $username,
                password: $password,
            )
        }`,
      variables: formValues
    }).valueChanges
  }

  getBookings(type: string | null, username: string | null) {
    return this.apollo.mutate<any>({
      mutation: gql`
      query getBookings(
          $username: String!,
          $type: String!
      ) {
          getBookings(
              username: $username,
              type: $type
          ) {
              listing_id
              booking_id
              booking_date
              booking_start
              booking_end
              username
          }
      }
      `,
      variables: { username, type }
    })
  }

  getListings() {
    return this.apollo.watchQuery<any>({
      query: gql`
      query getListings {
          getListings {
              id
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
          }
      }
      `,
      variables: { type: localStorage.getItem('type') }
    }).valueChanges
  }

  signUp(formValues: any) {
    return this.apollo.mutate({
      mutation: gql`
      mutation createUser(
              $username: String!,
              $firstname: String!,
              $lastname: String!,
              $password: String!,
              $email: String!,
              $type: String!
          ) {
          createUser(
              username: $username,
              firstname: $firstname,
              lastname: $lastname,
              password: $password,
              email: $email,
              type: $type
          ){
              id
              username
              firstname
              lastname
              password
              email
              type
          }
      }`,
      variables: formValues
    })
  }

  createBooking(booking: any) {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createBooking(
            $listing_id: String!,
            $booking_id: String!,
            $booking_start: Date!,
            $booking_end: Date!,
            $username: String!,
            $type: String!
        ) {
            createBooking(
                listing_id: $listing_id,
                booking_id: $booking_id,
                booking_start: $booking_start,
                booking_end: $booking_end,
                username: $username,
                type: $type
            )
            {
                id
            }
        }
    `,
      variables: booking
    })
  }

  createListing(formValues: any) {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createListing(
            $listing_id: String!,
            $listing_title: String!,
            $description: String!,
            $street: String!,
            $city: String!,
            $postal_code: String!,
            $price: Float!,
            $email: String!,
            $username: String!,
            $type: String!
        ) {
            createListing(
                listing_id: $listing_id,
                listing_title: $listing_title,
                description: $description,
                street: $street,
                city: $city,
                postal_code: $postal_code,
                price: $price,
                email: $email,
                username: $username,
                type: $type
            )
            {
                id
            }
        }
    `,
      variables: formValues
    })
  }
}
