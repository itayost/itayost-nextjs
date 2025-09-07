export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">שאלות נפוצות</h1>
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">כמה זמן לוקח לבנות אתר?</h3>
            <p className="text-gray-400">
              זמן הפיתוח תלוי במורכבות הפרויקט. אתר פשוט יכול להיות מוכן תוך 2-3 שבועות.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">מה כולל התהליך?</h3>
            <p className="text-gray-400">
              התהליך כולל אפיון, עיצוב, פיתוח, בדיקות והעלאה לאוויר עם ליווי מלא.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}