'use client'
import { useState } from "react";

interface CheckoutFormProps {
  cartItems: any[];
  total: number;
  onClose: () => void;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, total, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phoneNumber: phone,
          email,
          address,
          comment,
          products: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Помилка оформлення");

      alert("✅ Замовлення успішно оформлено!");
      onClose();
      localStorage.removeItem("cart");
      window.location.href = "/"; // или /orders/success
    } catch (error) {
      alert("❌ Сталася помилка при оформленні замовлення");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 mb-1">Ім’я та прізвище</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Телефон</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="+380..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Адреса доставки</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Коментар до замовлення</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between font-semibold text-gray-900 mb-3">
          <span>Сума до сплати:</span>
          <span>{new Intl.NumberFormat("uk-UA").format(total)} ₴</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors disabled:opacity-60"
        >
          {loading ? "Відправлення..." : "Підтвердити замовлення"}
        </button>
      </div>
    </form>
  );
};
