#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, token, vec, Vec, Bytes, symbol_short};

#[contract]
pub struct PaymentContract;

#[contractimpl]
impl PaymentContract {
    pub fn make_payment(env: Env, to: Address, amount: i128, token_id: Address, message: Bytes) {
        let sender = env.current_contract_address();
        let token = token::Client::new(&env, &token_id);
        // Transfer the tokens
        token.transfer(&sender, &to, &amount);
        // Store the payment message
        let key = symbol_short!("msgs");
        let mut messages = Self::get_messages(&env);
        messages.push_back(message);
        env.storage().instance().set(&key, &messages);
        // Emit an event for the payment
        env.events().publish((symbol_short!("payment"), to), amount);
    }

    // Function to retrieve messages
    pub fn get_messages(env: &Env) -> Vec<Bytes> {
        let key = symbol_short!("msgs");
        env.storage().instance().get(&key).unwrap_or_else(|| {
            vec![env]
        })
    }

    // Function to view all messages (for demonstration purposes)
    pub fn view_all_messages(env: Env) -> Vec<Bytes> {
        Self::get_messages(&env)
    }
}
