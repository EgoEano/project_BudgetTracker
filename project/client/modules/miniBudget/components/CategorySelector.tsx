import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, ModalCard, Modal, Card, Button } from '../../../core/ui/components/interfaceComponents';
import { useStyleContext } from '../../../core/services/providers/styleProvider';
import { useNotification } from '../../../core/services/providers/notificationProvider';
import { Category, CategoryId } from '../types/budget';
import { useBudgetStore } from '../hooks/useBudgetStore';
import { CategoryForm } from './CategoryForm';

interface CategorySelectorProps {
    selectedId: CategoryId;
    onSelect: (id: CategoryId) => void;
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    isSettingsMode?: boolean;
}

export const CategorySelector = ({
    selectedId,
    onSelect,
    isShow,
    setIsShow,
    isSettingsMode = false
}: CategorySelectorProps) => {
    const { theme } = useStyleContext();
    const { pushDialog } = useNotification();
    const { categories, addCategory, updateCategory, deleteCategory } = useBudgetStore();
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handlePress = (cat: Category) => {
        if (isSettingsMode) {
            handleLongPress(cat);
            return;
        }
        onSelect(cat.id);
        setIsShow(false);
    };

    const handleLongPress = async (cat: Category) => {
        await pushDialog({
            header: "Manage Category",
            message: `What do you want to do with "${cat.label}"?`,
            actions: [
                { text: "Cancel", isResolve: false },
                { text: "Edit", isResolve: true, action: () => setEditingCategory(cat) },
                { text: "Delete", isResolve: true, action: () => handleDelete(cat) },
            ]
        });
    };

    const handleCreate = (data: Omit<Category, 'id'>) => {
        const newCategory: Category = {
            ...data,
            id: data.label.toLowerCase().replace(/\s/g, '_'),
        };
        addCategory(newCategory);
        onSelect(newCategory.id);
        setIsCreating(false);
        setIsShow(false);
    };

    const handleUpdate = (data: Omit<Category, 'id'>) => {
        if (editingCategory) {
            updateCategory({
                ...editingCategory,
                ...data,
            });
            setEditingCategory(null);
        }
    };

    const handleDelete = async (category: Category) => {
        await pushDialog({
            header: "Delete Category",
            message: `Are you sure you want to delete "${category.label}"?`,
            actions: [
                { text: "Cancel", isResolve: false },
                {
                    text: "Delete",
                    isResolve: true,
                    action: () => deleteCategory(category.id)
                }
            ]
        });
    };

    const styles = useMemo(() => StyleSheet.create({
        editorButton: {
            width: '100%',
            paddingVertical: theme?.tokens.sizes.spacing.xs,
            marginBottom: theme?.tokens.sizes.spacing.md,
        },
        grid: {
            //height: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: 8,
        },
        title: {
            marginBottom: 16,
            textAlign: 'center',
        },
        item: {
            width: '30%',
            aspectRatio: 1,
            margin: '1.5%',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme?.tokens.colors.onSurface,
        },
        selectedItem: {
            borderColor: theme?.tokens.colors.primary,
        },
        addItem: {
            borderStyle: 'dashed',
            borderColor: theme?.tokens.colors.onSurface,
            opacity: 0.7,
        },
        icon: {
            fontSize: 24,
            marginBottom: 4,
        },
        label: {
            textAlign: 'center',
        },
    }), [theme]);

    const renderContent = () => {
        if (isCreating) {
            return (
                <CategoryForm
                    onSubmit={handleCreate}
                    onCancel={() => setIsCreating(false)}
                />
            );
        }

        if (editingCategory) {
            return (
                <CategoryForm
                    initialValues={editingCategory}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingCategory(null)}
                />
            );
        }

        return (
            <>
                <Text variant="subtitle" colorVariant={'secondary'} style={styles.title}>Select Category</Text>
                <View
                    isScrollable={true}
                    style={styles.grid}
                >
                    <TouchableOpacity
                        style={[styles.item, styles.addItem]}
                        onPress={() => setIsCreating(true)}
                    >
                        <Text style={styles.icon}>➕</Text>
                        <Text colorVariant={'secondary'} style={styles.label}>Add New</Text>
                    </TouchableOpacity>

                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.item,
                                selectedId === cat.id && {
                                    borderColor: cat.color,
                                    backgroundColor: cat.color + '20'
                                }
                            ]}
                            onPress={() => handlePress(cat)}
                            onLongPress={() => handleLongPress(cat)}
                        >
                            <Text
                                style={[
                                    styles.label,
                                    selectedId === cat.id && { color: cat.color || '#00d000ff' }
                                ]}
                                variant="body"
                                colorVariant={selectedId === cat.id ? 'primary' : 'secondary'}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </>
        );
    };

    return (
        <ModalCard
            isShow={isShow}
            setIsShow={setIsShow}
            isHasCross={false}
            isScrollable={!(isCreating || editingCategory)}
        >
            {(isSettingsMode && !(isCreating || editingCategory)) && (
                <Button
                    style={{
                        button: styles.editorButton
                    }}
                    onPress={() => setIsShow(false)}
                >
                    <Text>Close Editor</Text>
                </Button>
            )}
            {renderContent()}
        </ModalCard>
    );
};
