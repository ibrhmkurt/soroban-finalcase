#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, token};

#[contract]
pub struct PaymentContract;

#[contractimpl]
impl PaymentContract {
    pub fn make_payment(env: Env, to: Address, amount: i128, token_id: Address) {
        let sender = env.current_contract_address();
        let token = token::Client::new(&env, &token_id);
        token.transfer(&sender, &to, &amount);
    }
}