"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {AddressForm} from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";

export default function Page() {
  const [step, setStep] = useState(1); 
  return (
    <div className="min-h-screen mx-auto text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`}>1</span>
            <span className={`text-sm font-bold ${step === 1 ? 'text-white' : 'text-gray-500'}`}>Adres</span>
          </div>
          <div className={`w-12 h-[2px] ${step > 1 ? 'bg-blue-600' : 'bg-gray-700'}`} />
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-blue-600' : 'bg-gray-700'}`}>2</span>
            <span className={`text-sm font-bold ${step === 2 ? 'text-white' : 'text-gray-500'}`}>Ödeme</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="address-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AddressForm onNext={() => setStep(2)} />
                </motion.div>
              ) : (
                <motion.div
                  key="payment-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentForm isActive={true} onBack={() => setStep(1)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary isFinalStep={step === 2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}