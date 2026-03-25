"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AddressForm } from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { sendNotification } from "@/lib/notifications";

export default function CheckOutPage() {
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState(null); 
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState(null);

  const handleAddressSubmit = (data: any) => {
    setAddressData(data); 
    setStep(2); 
  };

  const handlePaymentComplete = async (paymentInfo: any | null) => {
    if (paymentInfo) {
      setPaymentMethodData(paymentInfo);
      setIsPaymentComplete(true);

      if (paymentInfo.items) {
        for (const item of paymentInfo.items) {
          if (item.sellerId) {
            await sendNotification(
              String(item.sellerId),
              'order',
              'YENİ SİPARİŞ',
              `${item.title} ürünü için sipariş alındı.`
            );
          }
        }
      }
    } else {
      setIsPaymentComplete(false); 
      setPaymentMethodData(null);
    }
  };

  return (
    <div className="min-h-screen mx-auto text-white py-12 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= 1 ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-gray-800'}`}>1</span>
            <span className={`text-sm font-bold ${step === 1 ? 'text-white' : 'text-gray-500'}`}>Teslimat</span>
          </div>
          <div className={`w-16 h-[2px] transition-colors duration-500 ${step > 1 ? 'bg-blue-600' : 'bg-gray-800'}`} />
          <div className="flex items-center gap-2">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step === 2 ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-gray-800'}`}>2</span>
            <span className={`text-md font-bold ${step === 2 ? 'text-white' : 'text-gray-500'}`}>Ödeme</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <AddressForm onNext={handleAddressSubmit} />
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <PaymentForm 
                    isActive={true} 
                    onBack={() => {
                        setStep(1);
                        setIsPaymentComplete(false);
                    }} 
                    onComplete={handlePaymentComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary 
                isFinalStep={step === 2 && isPaymentComplete} 
                addressData={addressData}
                paymentMethod={paymentMethodData} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}