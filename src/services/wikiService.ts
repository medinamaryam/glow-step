export interface IngredientInfo {
  name: string;
  function: string;
  bestFor: string[];
  tip: string;
}

export const INGREDIENT_WIKI: Record<string, IngredientInfo> = {
  'retinol': {
    name: 'Retinol (Vitamin A)',
    function: 'Mempercepat regenerasi sel kulit, menyamarkan garis halus, dan membantu mengatasi jerawat.',
    bestFor: ['Oily', 'Aging', 'Acne-Prone'],
    tip: 'Gunakan hanya pada malam hari dan wajib pakai sunscreen di pagi hari!'
  },
  'vitamin c': {
    name: 'Vitamin C',
    function: 'Antioksidan kuat yang mencerahkan kulit dan melindungi dari radikal bebas.',
    bestFor: ['All Skin Types', 'Dullness'],
    tip: 'Paling efektif jika digunakan di pagi hari di bawah sunscreen.'
  },
  'niacinamide': {
    name: 'Niacinamide (Vitamin B3)',
    function: 'Mengontrol produksi minyak, mengecilkan pori-pori, dan memperkuat skin barrier.',
    bestFor: ['Oily', 'Sensitive', 'Acne-Prone'],
    tip: 'Bahan yang sangat "friendly" dan bisa digabung dengan hampir semua bahan lain.'
  },
  'salicylic acid': {
    name: 'Salicylic Acid (BHA)',
    function: 'Eksfoliator kimia yang membersihkan pori-pori tersumbat dan mengatasi komedo.',
    bestFor: ['Oily', 'Acne-Prone'],
    tip: 'Jangan gunakan setiap hari jika kulitmu cenderung kering.'
  },
  'hyaluronic acid': {
    name: 'Hyaluronic Acid',
    function: 'Menarik kelembapan ke dalam kulit untuk hidrasi maksimal.',
    bestFor: ['Dry', 'Dehydrated', 'All Skin Types'],
    tip: 'Aplikasikan pada kulit yang masih lembap untuk hasil terbaik.'
  },
  'zinc': {
    name: 'Zinc',
    function: 'Membantu menenangkan peradangan dan mengontrol produksi sebum.',
    bestFor: ['Oily', 'Inflamed'],
    tip: 'Sangat bagus dipasangkan dengan Niacinamide.'
  }
};

export function getIngredientInfo(name: string): IngredientInfo | null {
  const key = name.toLowerCase();
  // Try exact match or includes
  const foundKey = Object.keys(INGREDIENT_WIKI).find(k => key.includes(k) || k.includes(key));
  return foundKey ? INGREDIENT_WIKI[foundKey] : null;
}
