/**
 * Safety service to detect ingredient conflicts in skincare products.
 */

export interface IngredientConflict {
  ingredients: string[];
  message: string;
  severity: 'high' | 'medium';
}

const CONFLICTS: IngredientConflict[] = [
  {
    ingredients: ['retinol', 'vitamin c'],
    message: 'BAHAYA! Kombinasi Retinol dan Vitamin C dalam satu waktu dapat menyebabkan iritasi kulit yang parah, kemerahan, hingga pengelupasan (over-exfoliation). Gunakan Vitamin C di pagi hari dan Retinol di malam hari.',
    severity: 'high'
  },
  {
    ingredients: ['retinol', 'aha', 'bha', 'salicylic acid', 'glycolic acid'],
    message: 'Waspada over-exfoliation! Mencampur Retinol dengan bahan eksfoliasi (AHA/BHA) berisiko merusak skin barrier.',
    severity: 'high'
  },
  {
    ingredients: ['vitamin c', 'aha', 'bha'],
    message: 'Kombinasi ini bisa bikin kulit perih. Sebaiknya gunakan di waktu yang berbeda.',
    severity: 'medium'
  },
  {
    ingredients: ['vitamin c', 'niacinamide'],
    message: 'Efek samping flushing! Niacinamide & Vit C kadang memicu kemerahan sementara pada kulit sensitif.',
    severity: 'medium'
  },
  {
    ingredients: ['retinol', 'benzoyl peroxide'],
    message: 'Bahan ini saling menetralkan. Hasilnya jadi tidak maksimal dan kulit bisa sangat kering.',
    severity: 'high'
  }
];

/**
 * Checks for conflicts between lists of ingredients from multiple products.
 * @param productsIngredients Array of ingredient lists (each list is an array of strings)
 */
export function checkIngredientConflicts(productsIngredients: string[][]): IngredientConflict[] {
  const allIngredients = productsIngredients.flat().map(i => i.toLowerCase());
  const foundConflicts: IngredientConflict[] = [];

  for (const conflict of CONFLICTS) {
    const matchingIngredients = conflict.ingredients.filter(ci => 
      allIngredients.some(ai => ai.includes(ci))
    );

    // If more than one conflicting ingredient from the rule is present in the collective list
    if (matchingIngredients.length > 1) {
      foundConflicts.push(conflict);
    }
  }

  return foundConflicts;
}
