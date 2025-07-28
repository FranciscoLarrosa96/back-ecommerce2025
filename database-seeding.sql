-- ==========================================
-- 🗃️ SCRIPT COMPLETO PARA POBLAR LA BASE DE DATOS
-- ==========================================
-- Ejecuta esto en tu PostgreSQL (pgAdmin o terminal)

-- Insertar Categorías
INSERT INTO category (name) VALUES
('Periféricos'),
('Gabinetes'),
('Motherboards'),
('Microprocesadores'),
('Memorias'),
('Almacenamiento'),
('Placas de Video'),
('Monitores'),
('Fuentes'),
('Computadoras'),
('Refrigeración PC'),
('Outlet'),
('Notebooks'),
('Accesorios'),
('Conectividad'),
('Sillas'),
('Combo Actualización'),
('Impresoras'),
('Tablet'),
('Software'),
('Proyectores');

-- Insertar Marcas
INSERT INTO brand (name) VALUES
('MSI'),
('Asus'),
('Gigabyte'),
('Zotac'),
('EVGA'),
('ASRock'),
('Corsair'),
('Kingston'),
('HyperX'),
('Cooler Master'),
('Thermaltake');

-- Insertar Subcategorías (requiere que las categorías ya estén insertadas)
INSERT INTO subcategory (name, "categoryId") VALUES
('Memorias para PC', (SELECT id FROM category WHERE name = 'Memorias')),
('SSDs Internos', (SELECT id FROM category WHERE name = 'Almacenamiento')),
('Mid Tower', (SELECT id FROM category WHERE name = 'Gabinetes')),
('Placas de Video Nvidia', (SELECT id FROM category WHERE name = 'Placas de Video')),
('AMD AM4', (SELECT id FROM category WHERE name = 'Motherboards')),
('Socket AM5', (SELECT id FROM category WHERE name = 'Motherboards')),
('Mouse', (SELECT id FROM category WHERE name = 'Periféricos')),
('Teclados', (SELECT id FROM category WHERE name = 'Periféricos')),
('Fuentes 80 Plus Bronze', (SELECT id FROM category WHERE name = 'Fuentes')),
('PC Gamer Gama Media', (SELECT id FROM category WHERE name = 'Computadoras')),
('Monitores 165hz', (SELECT id FROM category WHERE name = 'Monitores')),
('Cooler', (SELECT id FROM category WHERE name = 'Refrigeración PC')),
('Auriculares', (SELECT id FROM category WHERE name = 'Periféricos')),
('Mouse Pad', (SELECT id FROM category WHERE name = 'Accesorios'));

-- ==========================================
-- ✅ VERIFICACIÓN DE DATOS INSERTADOS
-- ==========================================

-- Verificar categorías
SELECT 'Categorías' as tabla, COUNT(*) as total FROM category
UNION ALL
SELECT 'Marcas' as tabla, COUNT(*) as total FROM brand  
UNION ALL
SELECT 'Subcategorías' as tabla, COUNT(*) as total FROM subcategory;

-- Ver relaciones de subcategorías con categorías
SELECT 
    s.name as subcategoria,
    c.name as categoria
FROM subcategory s
JOIN category c ON s."categoryId" = c.id
ORDER BY c.name, s.name;
