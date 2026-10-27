"""add_conditional_serving_constraints

Revision ID: 5f01b28823cf
Revises: dd5a613843df
Create Date: 2026-10-25 15:14:38.510176

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5f01b28823cf'
down_revision: Union[str, Sequence[str], None] = 'dd5a613843df'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_check_constraint(
        "ck_food_items_per_100g_conditional_serving",
        "food_items",
        "nutrition_reference_basis != 'per_100g' OR (serving_volume_ml IS NULL AND (serving_unit IN ('g', 'gram', 'grams', 'kg', 'oz') OR (serving_weight_g IS NOT NULL AND serving_weight_g > 0)))",
    )
    op.create_check_constraint(
        "ck_food_items_per_100ml_conditional_serving",
        "food_items",
        "nutrition_reference_basis != 'per_100ml' OR (serving_weight_g IS NULL AND (serving_unit IN ('ml', 'millilitre', 'millilitres', 'l', 'fl oz') OR (serving_volume_ml IS NOT NULL AND serving_volume_ml > 0)))",
    )
    op.create_check_constraint(
        "ck_food_items_per_serving_conditional_unit",
        "food_items",
        "nutrition_reference_basis != 'per_serving' OR (serving_unit IS NOT NULL AND length(trim(serving_unit)) > 0)",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        "ck_food_items_per_serving_conditional_unit",
        "food_items",
        type_="check",
    )
    op.drop_constraint(
        "ck_food_items_per_100ml_conditional_serving",
        "food_items",
        type_="check",
    )
    op.drop_constraint(
        "ck_food_items_per_100g_conditional_serving",
        "food_items",
        type_="check",
    )
