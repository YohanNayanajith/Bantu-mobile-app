import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, SafeAreaView } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { icons, COLORS, SIZES } from "../constans";
import Header from "./Header.component";
import HeaderWithBack from "./HeaderWithBack.component";

//ADD localhost address of your server
const API_URL = "http://192.168.8.187:5000/api/v1/checkout";

const StripeApp = ({ paymentData }) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const navigation = useNavigation();

  const userID = useSelector((state) => state.login.userID);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paymentData.price * 100,
        currency: "usd",
      }),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          savePaymentData(paymentIntent);
          navigation.navigate("BelongsPost");
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  const savePaymentData = async (data) => {
    try {
      let response = await fetch("http://192.168.8.187:5000/api/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.amount / 100,
          canceledAt: data.canceledAt,
          captureMethod: data.captureMethod,
          clientSecret: data.clientSecret,
          confirmationMethod: data.confirmationMethod,
          created: data.created,
          currency: data.currency,
          description: data.description,
          id: data.id,
          lastPaymentError: data.lastPaymentError,
          livemode: data.livemode,
          nextAction: data.nextAction,
          paymentMethodId: data.paymentMethodId,
          receiptEmail: data.receiptEmail,
          shipping: data.shipping,
          status: data.status,
          UserID: userID,
        }),
      });
      let json = await response.json();
      afterPayment();
      alert("Payment Saved!");
    } catch (error) {
      alert(error);
    }
  };

  const afterPayment = async () => {
    try {
      let response = await fetch(
        `http://192.168.8.187:5000/api/v1/post/${paymentData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_success: true,
          }),
        }
      );
      let json = await response.json();
      alert("Post payment success!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <Header title={"BANTU.LK"} />
      <HeaderWithBack
        text={"Payment"}
        iconLeft={"arrow-left"}
        textColor={COLORS.primary}
        iconsColor={COLORS.black}
        isEnabled="0"
      />
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} style={styles.buttonContainer} />
      </View>
    </SafeAreaView>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 20,
    marginTop: 40,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom:20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 18,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 18,
  },
  cardContainer: {
    height: 50,
    marginBottom: 20,
  },
});
