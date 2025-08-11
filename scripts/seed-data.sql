-- Données d'exemple pour Maison L'Orayane

-- Insertion des produits de base
INSERT INTO products (name, description, price, image_url, category, active, start_date, end_date) VALUES
('Baguette Tradition', 'Notre baguette emblématique, croustillante à l''extérieur et moelleuse à l''intérieur', 1.20, '/placeholder.svg?height=200&width=300', 'Pains', true, '2024-01-01', '2024-12-31'),
('Pain de Campagne', 'Pain rustique au levain, parfait pour accompagner vos repas', 2.80, '/placeholder.svg?height=200&width=300', 'Pains', true, '2024-01-01', '2024-12-31'),
('Pain aux Céréales', 'Pain complet enrichi de graines et céréales', 3.20, '/placeholder.svg?height=200&width=300', 'Pains', true, '2024-01-01', '2024-12-31'),

('Croissant au Beurre', 'Croissant feuilleté au beurre français, cuit chaque matin', 1.50, '/placeholder.svg?height=200&width=300', 'Viennoiseries', true, '2024-01-01', '2024-12-31'),
('Pain au Chocolat', 'Viennoiserie feuilletée avec deux barres de chocolat noir', 1.60, '/placeholder.svg?height=200&width=300', 'Viennoiseries', true, '2024-01-01', '2024-12-31'),
('Chausson aux Pommes', 'Pâte feuilletée garnie de compote de pommes maison', 2.20, '/placeholder.svg?height=200&width=300', 'Viennoiseries', true, '2024-01-01', '2024-12-31'),

('Tarte aux Fruits', 'Tarte saisonnière aux fruits frais sur pâte sablée', 18.00, '/placeholder.svg?height=200&width=300', 'Pâtisseries', true, '2024-01-01', '2024-12-31'),
('Éclair au Chocolat', 'Pâte à choux garnie de crème pâtissière et glaçage chocolat', 3.50, '/placeholder.svg?height=200&width=300', 'Pâtisseries', true, '2024-01-01', '2024-12-31'),
('Mille-feuille', 'Feuilletage croustillant et crème pâtissière vanille', 4.20, '/placeholder.svg?height=200&width=300', 'Pâtisseries', true, '2024-01-01', '2024-12-31'),
('Paris-Brest', 'Pâte à choux en couronne garnie de crème pralinée', 4.80, '/placeholder.svg?height=200&width=300', 'Pâtisseries', true, '2024-01-01', '2024-12-31');

-- Insertion d'une commande d'exemple
INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, status) VALUES
('Marie Dubois', 'marie.dubois@email.com', '06 12 34 56 78', 6.90, 'En préparation');

-- Récupération de l'ID de la commande pour les articles
DO $$
DECLARE
    order_uuid UUID;
    baguette_uuid UUID;
    croissant_uuid UUID;
BEGIN
    -- Récupération des UUIDs
    SELECT id INTO order_uuid FROM orders WHERE customer_email = 'marie.dubois@email.com' LIMIT 1;
    SELECT id INTO baguette_uuid FROM products WHERE name = 'Baguette Tradition' LIMIT 1;
    SELECT id INTO croissant_uuid FROM products WHERE name = 'Croissant au Beurre' LIMIT 1;
    
    -- Insertion des articles de commande
    INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES
    (order_uuid, baguette_uuid, 'Baguette Tradition', 1.20, 2, 2.40),
    (order_uuid, croissant_uuid, 'Croissant au Beurre', 1.50, 3, 4.50);
END $$;
