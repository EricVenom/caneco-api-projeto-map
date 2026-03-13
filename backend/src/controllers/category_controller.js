import pool from '../services/db.js'

export const listarCategorias = async (req, res) => {
    const query = `SELECT * FROM tb_category`;
    try {
        const result = await pool.query(query);
        res.status(200).json({ categorias: result.rows })
    } catch (error) {
        console.error(error);
    }
}

export const listarProdutosPorCategoria = async (req, res) => {
    const { id_categoria } = req.params;
    const query = `
        SELECT 
            p.id_product, 
            p.name as product_name, 
            p.price, 
            c.name as category_name 
        FROM tb_product as p
        INNER JOIN tb_category as c 
        ON p.category = c.id_category
        WHERE p.category = $1;
    `;
    const values = [id_categoria];

    try {
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Nenhum produto encontrado para essa categoria."
            });
        }

        res.status(200).json({
            categoria: id_categoria,
            produtos: result.rows
        });

    } catch (error) {
        console.error('Erro ao listar produtos por categoria:', error);
        res.status(500).json({
            erro: "Erro interno ao buscar produtos por categoria."
        });
    }
}
