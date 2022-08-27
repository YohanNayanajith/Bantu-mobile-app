import React from 'react'
import { View } from 'react-native'
import StripeApp from '../components/StripeApp.component'
import { StripeProvider } from '@stripe/stripe-react-native'

const Stripe = (props) => {
  return (
    <StripeProvider publishableKey='pk_test_51LKTEFC5XWsBcsgy0nXH9vDEsMvsmjDznRBbQXVhH6PVbECbImSX18NEuk7Qu4QuDWEhkz2xGA0L0Qi8czIgeazn00OEVeVNs7'>
        <StripeApp paymentData={props.route.params} />
    </StripeProvider>
  )
}

export default Stripe