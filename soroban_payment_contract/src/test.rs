#![cfg(test)]

use soroban_sdk::Env;
use crate::PaymentContract;

#[test]
fn test_make_payment() {
    let env = Env::default();
    let contract_id = env.register_contract(None, PaymentContract);
    let client = PaymentContractClient::new(&env, &contract_id);

    // Create test addresses
    let recipient = Address::random(&env);
    let token_id = Address::random(&env);

    // Make a payment
    client.make_payment(&recipient, &100i128, &token_id, &"Test payment".into());

    // Verify the payment was recorded
    let messages = client.view_all_messages();
    assert_eq!(messages.len(), 1);
    assert_eq!(messages[0], "Test payment");
}