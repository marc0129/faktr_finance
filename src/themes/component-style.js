/**
 * MUI Components whose styles are override as per theme
 * @param {JsonObject} theme Plain Json Object
 */
export function componentStyleOverrides(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '1px 1px 0.5px #eee'
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: '20px'
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors.textDark,
                    padding: '20px 10px 5px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '@media (max-width:600px)': {
                        padding: '5px'
                    },
                    padding: '20px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextSecondary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '& .MuiListItemIcon-root': {
                        color: '#aaa'
                    },
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme.menuSelectedBack,
                        '&:hover': {
                            backgroundColor: theme.menuSelectedBack
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected
                        }
                    },
                    '&:hover': {
                        backgroundColor: theme.menuSelectedBack,
                        color: theme.menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: theme.colors.grey50,
                    borderRadius: theme.customization.borderRadius + 'px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors.mainLight

                    },
                    '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.colors.mainLight
                        }
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors.mainLight
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 600,
                    // background: theme.colors.grey50,
                    color: "#666",
                    background: '#fff',
                    padding: '15.5px 14px',
                    borderRadius: theme.customization.borderRadius + 'px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    background: '#fff',
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: theme.customization.borderRadius + 'px'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme.colors.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.colors.primaryDark,
                    background: theme.colors.primary200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.paper,
                    background: theme.colors.grey700
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#666'
                }
            }
        }
    };
}
