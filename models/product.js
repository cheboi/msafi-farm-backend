import pool from "../config/db.js";

export const createProduct = async (product) => {
  const {
    name,
    category,
    subcategory,
    price,
    discount,
    image,
    stock,
    description,
    seller_id,
  } = product;
  const result = await pool.query(
    `INSERT INTO products (name, category, subcategory, price, discount, image, stock, description, seller_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      name,
      category,
      subcategory,
      price,
      discount,
      image,
      stock,
      description,
      seller_id,
    ]
  );
  return result.rows[0];
};

export const getAllProducts = async () => {
  const result = await pool.query(`
  SELECT 
  p.id, 
  p.name, 
  p.category, 
  p.subcategory, 
  p.price, 
  p.discount, 
  p.image, 
  p.stock, 
  p.description, 
  p.created_at, 
  p.updated_at,
  json_build_object(
    'name', sd.name,
    'location', sd.location,
    'contact', sd.contact
  ) AS seller
FROM products p
LEFT JOIN seller_details sd ON p.seller_id = sd.user_id
ORDER BY p.created_at DESC;
  `);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      p.id, 
      p.name, 
      p.category, 
      p.subcategory, 
      p.price, 
      p.discount, 
      p.image, 
      p.stock, 
      p.description, 
      p.created_at, 
      p.updated_at,
      json_build_object(
        'name', sd.name,
        'location', sd.location,
        'contact', sd.contact
      ) AS seller
    FROM products p
    LEFT JOIN seller_details sd ON p.seller_id = sd.user_id
    WHERE p.id = $1
  `,
    [id]
  );
  return result.rows[0];
};

export const updateProduct = async (id, product) => {
  const {
    name,
    category,
    subcategory,
    price,
    discount,
    image,
    stock,
    description,
    seller_id,
  } = product;
  const result = await pool.query(
    `UPDATE products 
     SET name = $1, category = $2, subcategory = $3, price = $4, discount = $5, image = $6, stock = $7, description = $8, seller_id = $9, updated_at = CURRENT_TIMESTAMP
     WHERE id = $10 RETURNING *`,
    [
      name,
      category,
      subcategory,
      price,
      discount,
      image,
      stock,
      description,
      seller_id,
      id,
    ]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const searchProducts = async (query) => {
  const sqlQuery = `
    SELECT 
      p.id, 
      p.name, 
      p.category, 
      p.subcategory, 
      p.price, 
      p.discount, 
      p.image, 
      p.stock, 
      p.description, 
      p.created_at, 
      p.updated_at,
      json_build_object(
        'name', u.username,
        'location', u.location,
        'contact', u.contact
      ) AS seller
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.user_id
    WHERE p.name ILIKE $1 OR p.category ILIKE $1 OR p.subcategory ILIKE $1 OR p.description ILIKE $1
  `;
  const values = [`%${query}%`];
  const result = await pool.query(sqlQuery, values);
  return result.rows;
};
