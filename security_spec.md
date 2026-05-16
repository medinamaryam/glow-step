# GlowStep Firestore Security Specification

## Data Invariants
1. A product must have an `ownerId` matching the creator's UID.
2. A routine item must belong to a user and reference a valid product (not strictly enforced by rules but integrity is key).
3. Timestamps (`createdAt`, `updatedAt`) must be server-generated.
4. Ingredients list cannot exceed 100 items per product.
5. PAO months must be between 1 and 60.

## The Dirty Dozen (Test Matrix)
1. **Identity Spoofing**: Attempt to create a product with an `ownerId` that is not my UID. -> DENY
2. **PII Leak**: Attempt to read another user's email/profile. -> DENY
3. **Ghost Field Injection**: Attempt to add `isAdmin: true` to a user profile. -> DENY
4. **ID Poisoning**: Attempt to create a product with a 2KB document ID. -> DENY
5. **Timestamp Fraud**: Attempt to set a manual `createdAt` date in the past. -> DENY
6. **Immutable Field Breach**: Attempt to change the `ownerId` of an existing product. -> DENY
7. **Malicious Content**: Attempt to save a 1MB string into the `brand` field. -> DENY
8. **Orphaned Writes**: Attempt to update a product name but keep `updatedAt` as a static string. -> DENY
9. **Relational Bypass**: Attempt to create a routine for a user ID that I don't own. -> DENY
10. **Type Mismatch**: Attempt to set `paoMonths` as a boolean. -> DENY
11. **Massive Array**: Attempt to save an `ingredients` list with 5000 items. -> DENY
12. **Status Shortcut**: (N/A for this simple schema, but tracked).

## Security Rules Test Plan
We will use `@firebase/rules-unit-testing` logic (simulated in logic) to verify these constraints.
