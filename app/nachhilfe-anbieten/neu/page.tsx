import OfferForm from "../components/offer-form";
// here should be form that creates a new offer and also stores it into the database
// validate the inputs using zod and then send them to the drizzle postgres database
// we also might want to validate if there is already an offer by the user for the same subject which will get client side validated before trying to insert it into the db
export default function NewTutoringOffer() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <OfferForm />
    </div>
  );
}
